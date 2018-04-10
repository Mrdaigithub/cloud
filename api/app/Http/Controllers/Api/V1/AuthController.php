<?php
	
	namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Requests\RefreshTokenRequest;
	use GuzzleHttp\Client as httpClient;
	use App\Http\Requests\LoginRequest;
	use App\Http\Controllers\Api\ApiController;
	use Illuminate\Http\Request;
	use Illuminate\Validation\ValidationException;
	use Illuminate\Support\Facades\Hash;
	use App\Models\User;
	
	class AuthController extends ApiController {
		private $httpClient;
		
		public function __construct() {
			$this->httpClient = new httpClient;
		}
		
		
		private static function get( $url ) {
			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_HTTPHEADER, [
				"User-Agent: Self"
			] );
			curl_setopt( $ch, CURLOPT_URL, $url );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			$data = curl_exec( $ch );
			curl_close( $ch );
			
			return $data;
		}
		
		private function post( $url, $post_data ) {
			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_HTTPHEADER, [
				"User-Agent: Self",
			] );
			curl_setopt( $ch, CURLOPT_URL, $url );
			curl_setopt( $ch, CURLOPT_POST, true );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, $post_data );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			$data = curl_exec( $ch );
			curl_close( $ch );
			
			return $data;
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
					"passowrd" => [ "401000" ],
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
		
		protected function refreshToken( RefreshTokenRequest $refresh_token_request ) {
			return $this->httpClient->post(
				env( "API_DOMAIN" ) . "oauth/token", [
					"form_params" => [
						"grant_type"    => "refresh_token",
						"refresh_token" => $refresh_token_request->refreshToken,
						"client_id"     => env( "CLIENT_ID" ),
						"client_secret" => env( "CLIENT_SECRET" ),
						"scope"         => "",
					],
				]
			);
		}
	}
