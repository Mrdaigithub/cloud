<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;
use Validator;

class StorageController extends ApiController
{
    function __construct()
    {
        //
    }

    function create_dir(Request $request)
    {
        return $request->only('current_dir');
    }

    function get_file(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
