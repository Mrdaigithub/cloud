<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\PathResourceCollection;
use App\Http\Resources\ResourceResource;
use App\Models\Resource;


class ResourceController extends ApiController
{

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return PathResourceCollection
     */
    public function index(Request $request)
    {
        return new PathResourceCollection($request->user()->resources()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreResourceRequest $request
     * @return ResourceResource|mixed
     */
    public function store(\App\Http\Requests\StoreResourceRequest $request)
    {
        $resource = new resource();
        $user = $request->user();

        if (DB::select("SELECT count(id)
              FROM resources
              LEFT JOIN resource_user ON resources.id = resource_user.resource_id
              WHERE user_id=? AND path = ? AND resource_name=?",
                [$user->id, $request->get('path'), $request->get('resource_name')])[0]->count != 0) {
            return $this->failed(400006);
        }
        $resource->resource_name = $request->get('resource_name');
        $resource->file = false;
        $resource->path = $request->get('path');
        if (!$resource->save()) return $this->failed(500001, 500);
        $user->resources()->attach($resource->id);
        return new ResourceResource(Resource::find($resource->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Http\Requests\ShowPathResourceRequest $request
     * @param $path
     * @return PathResourceCollection
     */
    public function show_with_path(\App\Http\Requests\ShowPathResourceRequest $request, $path)
    {
        return new PathResourceCollection($request->user()->resources()->where('path', $path)->get());
    }

    /**
     * Search the resource
     *
     * @param \App\Http\Requests\SearchResourceRequest $request
     * @return mixed
     */
    public function search(\App\Http\Requests\SearchResourceRequest $request)
    {
        $query = $request->input('q');
        return DB::select("SELECT id, resource_name, file, path, created_at, updated_at
              FROM resources
              LEFT JOIN resource_user ON resources.id = resource_user.resource_id
              WHERE user_id=? AND trashed=? AND resource_name LIKE ?
              ORDER BY file DESC , resource_name",
            [$request->user()->id, false, "%$query%"]);
    }

    /**
     * Get the download secret url
     *
     * @param Request $request
     * @param $id
     * @return mixed|string
     */
    public function get_download_secret(Request $request, $id)
    {
        if (!count($request->user()->resources()->find($id))) {
            return $this->failed(400006);
        }
        $secret = Crypt::encryptString($id);
        return "//" . $_SERVER['SERVER_NAME'] . "/api/v1/resources/download/$secret";
    }

    /**
     * Download the resource by secret url
     *
     * @param $secret
     * @return mixed|\Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function download($secret)
    {
        $storage_path = storage_path('app/aetherupload/file/md5_files');
        $resource = Resource::find(Crypt::decryptString($secret));
        $files = Storage::files();
        $download_file = array_filter($files, function ($file) use ($resource) {
            return str_contains($file, $resource->hash);
        });
        if (!count($download_file)) {
            return $this->failed(409001);
        }
        $download_file = $download_file[key($download_file)];
        return response()->download("$storage_path/$download_file", $resource->resource_name);
    }

    /**
     * Move resource to the path
     *
     * @param \App\Http\Requests\MoveResourceRequest $request
     * @param $id
     * @return mixed
     */
    public function move(\App\Http\Requests\MoveResourceRequest $request, $id)
    {
        $user = $request->user();
        $resource = Resource::find($id);
        $base_path = $resource->path;
        $new_path = $request->get('path');
        $old_path = "$base_path.$id";
        if (DB::select("SELECT text2ltree('$new_path') <@ text2ltree('$old_path') is_child;")[0]->is_child) {
            return $this->failed(500000, 500);
        }
        $move_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $old_path]);
        $move_id_list = array_map(function ($item) {
            return $item->id;
        }, $move_id_list);
        array_push($move_id_list, $id);
        foreach ($move_id_list as $move_id) {
            $resource = Resource::find($move_id);
            $resource->path = preg_replace("/($base_path)/", $new_path, $resource->path);
            if (!$resource->save()) return $this->failed(500001, 500);
        }
        return $resource;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(\App\Http\Requests\UpdateResourceRequest $request, $id)
    {
        $resource = Resource::find($id);
        $request->has('resource_name') ? $resource->resource_name = $request->get('resource_name') : null;
        if (!$resource->save()) return $this->failed(500001, 500);
        return $resource;
    }

    /**
     * trash resource
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function trash_resource(Request $request, $id)
    {
        $user = $request->user();
        $resource = Resource::find($id);
        $base_path = $resource->path;
        $path = $resource->path . ".$id";
        if ($resource->file) {
            $resource->trashed = true;
            if (!$resource->save()) return $this->failed(500001, 500);
            return $resource;
        }
        $trash_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $path, false]);
        $trash_id_list = array_map(function ($item) {
            return $item->id;
        }, $trash_id_list);
        array_push($trash_id_list, $id);
        foreach ($trash_id_list as $trash_id) {
            $resource = Resource::find($trash_id);
            $resource->trashed = true;
            $resource->trash_path = preg_replace("/($base_path)/", '0', $resource->path);
            if (!$resource->save()) return $this->failed(500001, 500);
        }
        return $resource;
    }

    /**
     * restore the resource
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function restore(Request $request, $id)
    {
        $user = $request->user();
        $resource = Resource::find($id);
        $restore_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND trash_path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $resource->trash_path . ".$id", true]);
        $restore_id_list = array_map(function ($item) {
            return $item->id;
        }, $restore_id_list);
        array_push($restore_id_list, $id);
        foreach ($restore_id_list as $restore_id) {
            $resource = Resource::find($restore_id);
            $resource->trashed = false;
            $resource->trash_path = '0';
            if (!$resource->save()) return $this->failed(500001, 500);
        }
        return $resource;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $base_path = Resource::find($id)->path;
        $path = Resource::find($id)->path . '.' . $id;
        $trash_path = Resource::find($id)->trash_path . '.' . $id;
        $remove_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND trash_path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $trash_path, true]);
        $old_child_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $path]);
        if (count($old_child_id_list)) {
            foreach ($old_child_id_list as $child_id) {
                $resource = Resource::find($child_id->id);
                $resource->path = preg_replace("/($path)/", $base_path, $resource->path);
                if (!$resource->save()) return $this->failed(500001);
            }
        }
        $request->user()->resources()->detach($id);
        Resource::destroy($id);
        if (count($remove_id_list)) {
            foreach ($remove_id_list as $remove_id) {
                $request->user()->resources()->detach($remove_id->id);
                Resource::destroy($remove_id->id);
            }
        }
    }
}
