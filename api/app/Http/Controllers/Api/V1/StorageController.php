<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Storage;
use App\Models\User;

class StorageController extends ApiController
{
    function __construct()
    {
        //
    }

    function create_dir(Request $request)
    {
        $req = $request->all();
        if (Validator::make($req,
            [
                'current_path' => 'required',
                'new_dir' => 'required',
            ])->fails()) return $this->failed(400000);
        if (Validator::make($req,
            [
                'current_path' => 'string',
                'new_dir' => 'string',
            ])->fails()) return $this->failed(400001);

        $storage = new Storage();
        $storage->storage_name = $req['new_dir'];
        $storage->file = false;
        $storage->path = $req['current_path'];
        if (!$storage->save()) return $this->failed(500001);
        $request->user()->storage()->attach($storage->id);
        return json_encode($request->user());
    }

    function get_file(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
