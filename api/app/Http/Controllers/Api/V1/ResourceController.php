<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Resource;


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
            }, explode(".", trim($path, '0.'))),
            function ($item) {
                return !!$item;
            });
        return trim('0.' . implode('', $path), '.');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $path = $this->deal_path($request->only('path')['path']);
        $uid = $request->user()->id;
        $resources = DB::select(
            "SELECT id, resource_name, file, created_at, updated_at, path
              FROM resources
              LEFT JOIN user_resource ON resources.id = user_resource.resource_id
              WHERE user_id=? AND path ~ ?
              ORDER BY file ,created_at ASC;", [$uid, $path]);
        return $resources;
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
              WHERE user_id=? AND path ~ ? AND resource_name=?",
                [$user->id, $path, $resource_name])[0]->count != 0) {
            return $this->failed(409000);
        }
        $resource->resource_name = $resource_name;
        $resource->file = false;
        if ($req['path']) $resource->path = $path;
        if (!$resource->save()) return $this->failed(500001);
        $user->resource()->attach($resource->id);
        return response()->json($resource);
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
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
