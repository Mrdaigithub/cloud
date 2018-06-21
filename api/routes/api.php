<?php
/**
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
	
	
	use Illuminate\Support\Facades\Route;
	
	Route::namespace( "Api\V1" )
	     ->prefix( "v1" )
	     ->group( function () {
		     Route::post( "/login/password", "AuthController@passwordLogin" );
		     Route::post( "/token/refresh", "AuthController@refreshToken" );
		     Route::get( "/login/code/github/{code}", "AuthController@githubCodeLogin" );
		     Route::get( "resources/download/{secret}", "ResourceController@download" );
		     Route::middleware( [ "api.auth", "auth:api" ] )->group( function () {
			     Route::prefix( "resources" )->group( function () {
				     Route::get( "link/{id}", "ResourceController@get_download_link" );
				     Route::get( "share/{visibility}/{id}", "ResourceController@get_share_secret" );
				     Route::get( "search", "ResourceController@search" );
				     Route::get( "{path}", "ResourceController@show_with_path" );
				     Route::get( "preview/{id}", "ResourceController@preview" );
				     Route::patch( "{id}/move", "ResourceController@move" );
				     Route::patch( "{id}/trash", "ResourceController@trash_resource" );
				     Route::patch( "{id}/restore", "ResourceController@restore" );
			     } );
			     Route::resource( "resources", "ResourceController" );
			     Route::resource( "users", "UserController" );
		     } );
	     } );
