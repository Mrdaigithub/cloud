<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/11/8
 * Time: 10:16
 */

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
    }
    public function index(){
        $user = DB::select('SELECT * FROM users WHERE uid=?', [1]);
        print_r(json_encode($user));
    }
}