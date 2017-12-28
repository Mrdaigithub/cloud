<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;
use Validator;

class FileController extends ApiController
{
    function __construct()
    {
        $this->base_path = (string)dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))) . '/storage/app/';
    }

    /**
     * 保存临时文件至tmps数据库和tmps文件夹下
     *
     * @param $file
     * @param $name
     * @param $file_hash
     * @param $hash
     * @param $num
     * @param $index
     * @return Tmp
     */
    private function save_tmp($file, $name, $file_hash, $hash, $num, $index)
    {
        $this->base_path . $file->storeAs('tmps', $hash);
        $tmp = new Tmp();
        $tmp->tmp_name_hash = $hash;
        $tmp->real_file = $name;
        $tmp->real_file_hash = $file_hash;
        $tmp->all_tmp_num = $num;
        $tmp->tmp_index = $index;
        $tmp->save();
        return $tmp;
    }

    /**
     * 检测是否完全接受完成所有临时文件
     *
     * @param $real_file
     * @return bool
     */
    private function receive_all_tmp($real_file)
    {
        return Tmp::where('real_file', $real_file)->count() >= Tmp::where('real_file', $real_file)->first()->all_tmp_num;
    }

    /**
     * 合并临时文件
     *
     * @param $real_file
     * @param $file_hash
     * @return string
     */
    private function merge_tmp($real_file, $file_hash)
    {
        $tmpList = Tmp::where('real_file_hash', $file_hash)->orderBy('tmp_index')->get();
        $extension = array_key_exists('extension', pathinfo($real_file)) ? '.' . pathinfo($real_file)['extension'] : null;
        $new_file_fp = fopen($this->base_path . 'public/files/' . $file_hash . $extension, 'wb+');
        foreach ($tmpList as $tmp) {
            $tmp_content = file_get_contents($this->base_path . 'tmps/' . $tmp['tmp_name_hash']);
            fwrite($new_file_fp, $tmp_content);
        }
        return $this->base_path . 'public/files/' . $file_hash . $extension;
    }

    /**
     * @param $full_filename
     * @param $file_hash
     * @return Storage
     */
    private function save_real_file($full_filename, $file_hash)
    {
        $file = new Storage();
        $file->full_filename = $full_filename;
        $file->file_hash = $file_hash;
        $file->file_hash = $file_hash;
        $file->file_size = filesize($full_filename);
        $file->file_type = pathinfo($full_filename)['extension'];
        $file->save();
        return $file;
    }

    function upload(Request $request)
    {
        $req = $request->all();
        if (Validator::make($req, [
            'real_file' => 'required',
            'real_file_hash' => 'required',
            'tmp_name_hash' => 'required',
            'all_tmp_num' => 'required',
            'tmp_index' => 'required'
        ])->fails()) return $this->failed(400000);
        if (Validator::make($req, [
            'real_file_hash' => 'unique:files,file_hash'
        ])->fails()) return $this->failed(409000, 409);
        $this->save_tmp(
            $request->file('files'),
            $req['real_file'],
            $req['real_file_hash'],
            $req['tmp_name_hash'],
            $req['all_tmp_num'],
            $req['tmp_index']
        );
        if ($this->receive_all_tmp($req['real_file'])) {
            $full_filename = $this->merge_tmp($req['real_file'], $req['real_file_hash']);
            return $this->save_real_file($full_filename, $req['real_file_hash']);
        }
        return json_encode(false);
    }

    function preprocess(Request $request)
    {
        $req = $request->all();
        if (Validator::make($req, [
            'filename' => 'required',
            'file_size' => 'required',
            'file_hash' => 'required',
        ])->fails()) return $this->failed(400000);
        if (Validator::make($req, [
            'file_hash' => 'unique:files,file_hash'
        ])->fails()) return response()->json(['exists' => true]);
//        return response()->json([
//            'exists' => true,
//            'chunk_size' => getenv('chunk_size'),
//        ]);
        return json_encode(Storage::makeDirectory('public/files'));
    }

    function get_file(Request $request)
    {
        return Storage::putFileAs('files', $request->file('files'), '1.html');
//        return Storage::url('gcTYPYyExkLnAUZD6IaCBbFpGcBNElgPAJ9ugY7K.ico');
    }
}
