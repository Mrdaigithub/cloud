<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api\V1')
    ->prefix('v1')
    ->group(function () {
        Route::post('/login/password', 'AuthController@passwordLogin');
        Route::get('resources/download/{secret}', 'ResourceController@download');
        Route::middleware(['api.auth', 'auth:api'])->group(function () {
            Route::resource('users', 'UserController');
            Route::get('secret/{id}', 'ResourceController@get_download_secret');
            Route::get('resources/search', 'ResourceController@search');
            Route::get('resources/{path}', 'ResourceController@show_with_path');
            Route::patch('resources/trash/{id}', 'ResourceController@trash_resource');
            Route::patch('resources/restore/{id}', 'ResourceController@restore');
            Route::resource('resources', 'ResourceController');
        });
    });
