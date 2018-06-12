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
			"password",
			"password_confirmation",
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
				"errors"  => $exception->errors(),
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
				"errors"  => $exception->errors(),
				"message" => $exception->getMessage(),
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
