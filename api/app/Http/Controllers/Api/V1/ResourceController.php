<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Resource;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;


class ResourceController extends ApiController
{
    /**
     * 处理path格式 =>（root.xxx.yyy.zzz）
     *
     * @param $path
     * @return string
     */
    private function deal_path($path)
    {
        $path = array_filter(
            array_map(function ($item) {
                return trim("$item.");
            }, explode(".", trim($path))),
            function ($item) {
                return !!$item;
            });
        return trim(implode('', $path), '.');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return $request
            ->user()->resource
            ->map(function ($item) {
                return collect($item)->except(['pivot', 'hash']);
            })
            ->sortBy('file')->values()
            ->sortBy('resource_name')->values()
            ->groupBy('path');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $req = $request->all();
        $resource = new Resource();
        $user = $request->user();
        $path = $this->deal_path($request->only('path')['path']);
        $resource_name = $request->only('resource_name')['resource_name'];

        if (Validator::make($req, ['resource_name' => 'required',])->fails()) {
            return $this->failed(400000);
        }
        if (Validator::make($req, ['new_dir' => 'string',])->fails()) {
            return $this->failed(400001);
        }
        if (DB::select("SELECT count(id)
              FROM resources
              LEFT JOIN user_resource ON resources.id = user_resource.resource_id
              WHERE user_id=? AND path = ? AND resource_name=?",
                [$user->id, $path, $resource_name])[0]->count != 0) {
            return $this->failed(409000);
        }
        $resource->resource_name = $resource_name;
        $resource->file = false;
        if ($req['path']) $resource->path = $path;
        if (!$resource->save()) return $this->failed(500001);
        $user->resource()->attach($resource->id);
        return collect(Resource::find($resource->id))->except('hash');
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
     * @param Request $request
     * @param $path
     */
    public function show_with_path(Request $request, $path)
    {
        return $request
            ->user()->resource
            ->where('path', $path)
            ->map(function ($item) {
                return collect($item)->except(['pivot', 'hash']);
            })
            ->sortBy('file')->values()
            ->sortBy('resource_name')->values()
            ->groupBy('path');
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        return DB::select("SELECT id, resource_name, file, path, created_at, updated_at
              FROM resources
              LEFT JOIN user_resource ON resources.id = user_resource.resource_id
              WHERE user_id=? AND trashed=? AND resource_name LIKE ?
              ORDER BY file DESC , resource_name",
            [$request->user()->id, false, "%$query%"]);
    }

    public function get_download_secret(Request $request, $id)
    {
        if (!count($request->user()->resource->find($id))) {
            return $this->failed(409001);
        }
        $secret = Crypt::encryptString($id);
        return "//" . $_SERVER['SERVER_NAME'] . "/api/v1/resources/download/$secret";
    }

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
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        if (Validator::make($request->all(), ['path' => 'required',])->fails()) {
            return $this->failed(400000);
        }
        $user = $request->user();
        $base_path = $this->deal_path(Resource::find($id)->path);
        $new_path = $request->only('path')['path'];
        $old_path = "$base_path.$id";
        if (DB::select("SELECT text2ltree('$new_path') <@ text2ltree('$old_path') is_child;")[0]->is_child) {
            return $this->failed(500000);
        }
        $move_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN user_resource ON resources.id = user_resource.resource_id
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
            if (!$resource->save()) return $this->failed(500001);
        }
        return 0;
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
        $base_path = $this->deal_path($resource->path);
        $path = $this->deal_path($resource->path . ".$id");
        if ($resource->file) {
            $resource->trashed = true;
            if (!$resource->save()) return $this->failed(500001);
            return $resource;
        }
        $trash_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN user_resource ON resources.id = user_resource.resource_id
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
            if (!$resource->save()) return $this->failed(500001);
        }
        return 0;
    }

    public function restore(Request $request, $id)
    {
        $user = $request->user();
        $resource = Resource::find($id);
        $restore_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN user_resource ON resources.id = user_resource.resource_id
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
            if (!$resource->save()) return $this->failed(500001);
        }
        return 0;
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
        $base_path = $this->deal_path(Resource::find($id)->path);
        $path = $this->deal_path(Resource::find($id)->path) . '.' . $id;
        $trash_path = $this->deal_path(Resource::find($id)->trash_path) . '.' . $id;
        $remove_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN user_resource ON resources.id = user_resource.resource_id
                          WHERE user_id=? AND trash_path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
            [$user->id, $trash_path, true]);
        $old_child_id_list = DB::select("SELECT id FROM resources
                          LEFT JOIN user_resource ON resources.id = user_resource.resource_id
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
        $request->user()->resource()->detach($id);
        Resource::destroy($id);
        if (count($remove_id_list)) {
            foreach ($remove_id_list as $remove_id) {
                $request->user()->resource()->detach($remove_id->id);
                Resource::destroy($remove_id->id);
            }
        }
    }
}
