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


$router->group(['namespace' => 'Api\V1'], function () use ($router) {
    $router->post('login', 'TokenController@login');
    $router->get('logout', 'TokenController@logout');
});
