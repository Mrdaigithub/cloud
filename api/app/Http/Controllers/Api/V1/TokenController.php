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
        return $request->all();
    }

    public function logout()
    {
        return 'logout';
    }
}