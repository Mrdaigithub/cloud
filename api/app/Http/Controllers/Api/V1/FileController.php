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
        $filename = $this->base_path . 'public/files/bg3.jpg';
        $fp = fopen($filename, 'wb+');

        $f1 = file_get_contents($this->base_path . 'public/files/18eb5b88952c81d72d5149b0ae60af63');
        $f2 = file_get_contents($this->base_path . 'public/files/8bc87c5d3b7eaff6b5e8afefae54cd72');
        $f3 = file_get_contents($this->base_path . 'public/files/ef97e212ce4d6e4743fb83388563e477');
        fwrite($fp, $f1);
        fwrite($fp, $f2);
        fwrite($fp, $f3);

//        $post_md5 = $request->only('md5');
//        $file = new File();
//        $file->full_filename = $this->base_path . $request->file('files')->storeAs('public/files', $post_md5['md5']);
//        $file->file_hash = hash_file('md5', $file->full_filename);
//        $file->file_size = filesize($file->full_filename);
////        $file->file_type = pathinfo($file->full_filename)['extension'];
////        $file->save();
//        return $file;
    }

    function get_file(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
