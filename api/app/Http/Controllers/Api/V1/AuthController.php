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

namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Requests\RefreshTokenRequest;
	use GuzzleHttp\Client as httpClient;
	use App\Http\Requests\LoginRequest;
	use App\Http\Controllers\Api\ApiController;
	use Illuminate\Support\Facades\Hash;
	use Illuminate\Validation\ValidationException;
	use App\Models\User;
	
	class AuthController extends ApiController {
		private $httpClient;
		
		public function __construct() {
			$this->httpClient = new httpClient;
		}
		
		/**
		 * 使用密码方式登陆
		 *
		 * @param LoginRequest $login_request
		 *
		 * @return mixed
		 */
		protected function passwordLogin( LoginRequest $login_request ) {
			$username = $login_request->get( "username" );
			$password = $login_request->get( "password" );
			$user     = User::where( "username", $username )->first();
			if ( ! Hash::check( $password, $user->password ) ) {
				throw ValidationException::withMessages( [
					"password" => [ "401000" ],
				] )->status( 401 );
			}
			
			return $this->httpClient->post(
				env( "API_DOMAIN" ) . "oauth/token", [
					"form_params" => [
						"grant_type"    => "password",
						"client_id"     => env( "CLIENT_ID" ),
						"client_secret" => env( "CLIENT_SECRET" ),
						"username"      => $user->email,
						"password"      => $password,
						"scope"         => ""
					]
				]
			)->getBody();
		}
		
		/**
		 * 刷新token
		 *
		 * @param RefreshTokenRequest $refresh_token_request
		 *
		 * @return \Psr\Http\Message\StreamInterface
		 */
		protected function refreshToken( RefreshTokenRequest $refresh_token_request ) {
			try {
				return $this->httpClient->post(
					env( "API_DOMAIN" ) . "oauth/token", [
						"form_params" => [
							"grant_type"    => "refresh_token",
							"refresh_token" => $refresh_token_request->refresh_token,
							"client_id"     => env( "CLIENT_ID" ),
							"client_secret" => env( "CLIENT_SECRET" ),
							"scope"         => "",
						],
					]
				)->getBody();
			} catch ( \Exception $exception ) {
				throw ValidationException::withMessages( [
					"token" => [ "401002" ],
				] )->status( 401 );
			}
		}
	}
