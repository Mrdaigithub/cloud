<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class FileController extends Controller
{
    function upload(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
