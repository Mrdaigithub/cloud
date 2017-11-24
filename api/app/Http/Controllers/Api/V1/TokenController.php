<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 17-11-23
 * Time: 下午8:58
 */

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TokenController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        return $credentials['username'];
//        $results = app('db')->select("SELECT * FROM users");
    }

    public function logout()
    {
        return 'logout';
    }
}