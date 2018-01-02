<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Resource;
use App\Models\User;

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
            }, explode(".", trim($path, 'root.'))),
            function ($item) {
                return !!$item;
            });
        return trim('root.' . implode('', $path), '.');
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
              WHERE user_id=? AND path ~ ?;", [$uid, $path]);
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
        if (Validator::make($req,
            [
                'new_dir' => 'required',
            ])->fails()) return $this->failed(400000);
        if (Validator::make($req,
            [
                'new_dir' => 'string',
            ])->fails()) return $this->failed(400001);

        $storage = new Resource();
        $storage->resource_name = $req['new_dir'];
        $storage->file = false;
        if ($req['current_path']) $storage->path = 'root.' . $req['current_path'];
        if (!$storage->save()) return $this->failed(500001);
        $request->user()->storage()->attach($storage->id);
        return response()->json($storage);
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
