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
        Route::middleware(['api.auth', 'auth:api'])->group(function () {
            Route::post('/file/upload', 'FileController@upload');
            Route::resource('users', 'UserController');
        });
    });
