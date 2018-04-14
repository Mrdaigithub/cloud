<?php
	
	namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Requests\RefreshTokenRequest;
	use GuzzleHttp\Client as httpClient;
	use App\Http\Requests\LoginRequest;
	use App\Http\Controllers\Api\ApiController;
	use Illuminate\Support\Facades\Hash;
	use Illuminate\Validation\ValidationException;
	use App\Models\User;
	use Mockery\Exception;
	
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
			);
		}
		
		/**
		 * 刷新token
		 *
		 * @param RefreshTokenRequest $refresh_token_request
		 *
		 * @return \Psr\Http\Message\ResponseInterface
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
				);
			} catch ( \Exception $exception ) {
				throw ValidationException::withMessages( [
					"password" => [ "401002" ],
				] )->status( 401 );
			}
		}
	}
