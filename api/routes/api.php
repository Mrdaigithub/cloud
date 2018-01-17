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
        Route::post('/login/code', 'AuthController@codeLogin');
        Route::get('resources/download/{secret}', 'ResourceController@download');
        Route::middleware(['api.auth', 'auth:api'])->group(function () {
            Route::prefix('resources')->group(function () {
                Route::get('secret/{id}', 'ResourceController@get_download_secret');
                Route::get('search', 'ResourceController@search');
                Route::get('{path}', 'ResourceController@show_with_path');
                Route::patch('trash/{id}', 'ResourceController@trash_resource');
                Route::patch('restore/{id}', 'ResourceController@restore');
            });
            Route::resource('resources', 'ResourceController');
            Route::resource('users', 'UserController');
        });
    });
