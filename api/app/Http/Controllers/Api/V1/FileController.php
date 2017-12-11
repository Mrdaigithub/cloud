<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\File;


class FileController extends Controller
{
    function __construct()
    {
        $this->base_path = dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))) . '/storage/app/';
    }

    function upload(Request $request)
    {
        $file = new File();
        $file->full_filename = $this->base_path . $request->file('files')->store('public/files');
        $file->file_hash = hash_file('md5', $file->full_filename);
        $file->file_size = filesize($file->full_filename);
        $file->file_type = pathinfo($file->full_filename)['extension'];
        $file->save();
        return $file;
    }

    function get_file(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
