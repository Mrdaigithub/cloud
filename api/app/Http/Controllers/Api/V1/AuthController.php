<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Zend\Diactoros\Request;

class AuthController extends ApiController
{
    private static function get($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
        ]);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    private static function post($url, $post_data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        ]);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    /**
     * 使用密码方式登陆
     *
     * @param LoginRequest $request
     * @return mixed
     */
    function passwordLogin(LoginRequest $request)
    {
        $username = $request->get('username');
        $password = $request->get('password');
        $user = User::where('username', $username)->first();
        if (!Hash::check($password, $user->password)) return $this->failed('401000', 401);
        return $this->post(
            'http://api.mrdaisite.com/oauth/token',
            "grant_type=" . env('grant_type') . "&client_id=" . env('client_id') . "&client_secret=" . env('client_secret') . "&username=" . $user->email . "&password=" . $password . "&scope="
        );
    }

    /**
     * Github OAuth 登陆
     *
     * @param LoginRequest $request
     */
    function githubCodeLogin($code)
    {
        parse_str($this->post(
            'https://github.com/login/oauth/access_token',
            http_build_query([
                "client_id" => env('github_client_id'),
                "client_secret" => env('github_client_secret'),
                "code" => $code
            ])
        ), $result);
        $github_user = json_decode($this->get(
            "https://api.github.com/user?access_token=" . $result['access_token']
        ));
        $user = new User();
        $user->username = $github_user->login;
        $user->email = $github_user->email;
        $user->origin = 'github';
        if (!$user->save()) return $this->failed(500001, 500);
        return $result;
    }
}
