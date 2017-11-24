<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


//$router->group(['namespace' => 'Api\V1'], function () use ($router) {
//    $router->post('login', 'TokenController@login');
//    $router->get('logout', 'TokenController@logout');
//});
use Illuminate\Http\Request;

$router->get('/login', function (Request $request) {
    $token = app('auth')->attempt($request->only('username', 'password'));

//    return response()->json(compact('token'));
});

$router->get('/me', function (Request $request) {
    return $request->user();
});
