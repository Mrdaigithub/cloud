<?php
	
	namespace App\Exceptions;
	
	use Exception;
	use Illuminate\Auth\AuthenticationException;
	use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
	use Illuminate\Validation\ValidationException;
	
	class Handler extends ExceptionHandler {
		/**
		 * A list of the exception types that are not reported.
		 *
		 * @var array
		 */
		protected $dontReport = [
			//
		];
		
		/**
		 * A list of the inputs that are never flashed for validation exceptions.
		 *
		 * @var array
		 */
		protected $dontFlash = [
			'password',
			'password_confirmation',
		];
		
		/**
		 * Report or log an exception.
		 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
		 *
		 * @param  \Exception $exception
		 *
		 * @return void
		 * @throws Exception
		 */
		public function report( Exception $exception ) {
			parent::report( $exception );
		}
		
		/**
		 * Render an exception into an HTTP response.
		 *
		 * @param  \Illuminate\Http\Request $request
		 * @param  \Exception $exception
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function render( $request, Exception $exception ) {
			return parent::render( $request, $exception );
		}
		
		/**
		 * Convert a validation exception into a response.
		 *
		 * @param  \Illuminate\Http\Request $request
		 * @param  \Illuminate\Validation\ValidationException $exception
		 *
		 * @return \Illuminate\Http\Response
		 */
		protected function invalid( $request, ValidationException $exception ) {
			return response()->json( [
				'errors'  => [
					"username" => [ "401000", "401000" ],
					"password" => [ "401000", "401000" ],
				],
				"message" => $exception->getMessage(),
			], $exception->status );
		}
		
		/**
		 * Convert a validation exception into a JSON response.
		 *
		 * @param  \Illuminate\Http\Request $request
		 * @param  \Illuminate\Validation\ValidationException $exception
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		protected function invalidJson( $request, ValidationException $exception ) {
			return response()->json( [
				'errors'  => $exception->errors(),
				'message' => $exception->getMessage(),
			], $exception->status );
		}
		
		/**
		 * Convert an authentication exception into a response.
		 *
		 * @param  \Illuminate\Http\Request $request
		 * @param  \Illuminate\Auth\AuthenticationException $exception
		 *
		 * @return \Illuminate\Http\Response
		 */
		protected function unauthenticated( $request, AuthenticationException $exception ) {
			return response()->json( [
				"errors"  => [
					"token" => [ "401001" ]
				],
				"message" => $exception->getMessage(),
			], 401 );
		}
	}
