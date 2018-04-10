<?php
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
		     Route::get( "/login/code/github/{code}", "AuthController@githubCodeLogin" );
		     Route::get( "resources/download/{secret}", "ResourceController@download" );
		     Route::middleware( [ "api.auth", "auth:api" ] )->group( function () {
			     Route::prefix( "token" )->group( function () {
				     Route::post( "refresh", "AuthController@refreshToken" );
			     } );
			     Route::prefix( "resources" )->group( function () {
				     Route::get( "secret/{id}", "ResourceController@get_download_secret" );
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
