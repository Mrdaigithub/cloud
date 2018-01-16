<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends ApiController
{
    /**
     * 从指定url获取access token
     *
     * @param $url
     * @param $post_data
     * @return mixed
     */
    private function fetch_access_token($url, $post_data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    /**
     * 使用密码方式登陆
     *
     * @param Request $request
     * @return mixed
     */
    function passwordLogin(LoginRequest $request)
    {
        $req = $request->all();
        if (Validator::make($req,
            [
                'username' => 'required',
                'password' => 'required'
            ])->fails()) return $this->failed(400000);
        if (Validator::make($req,
            [
                'username' => 'string',
                'password' => 'string'
            ])->fails()) return $this->failed(400001);
        if (Validator::make($req, ['username' => 'exists:users,username'])->fails()) return $this->failed(400003);

        $user = User::where('username', $req['username'])->first();
        if (!Hash::check($req['password'], $user->password)) return $this->failed(401000, 401);
        return $this->fetch_access_token(
            'http://api.mrdaisite.com/oauth/token',
            "grant_type=" . env('grant_type') . "&client_id=" . env('client_id') . "&client_secret=" . env('client_secret') . "&username=" . $user->email . "&password=" . $req['password'] . "&scope="
        );
    }

    function codeLogin(LoginRequest $request)
    {
        return $request->all();
    }
}
