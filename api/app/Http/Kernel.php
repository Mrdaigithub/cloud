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

namespace App\Http;
	
	use Illuminate\Foundation\Http\Kernel as HttpKernel;
	
	class Kernel extends HttpKernel {
		/**
		 * The application's global HTTP middleware stack.
		 *
		 * These middleware are run during every request to your application.
		 *
		 * @var array
		 */
		protected $middleware = [
			\Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
			\Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
			\App\Http\Middleware\TrimStrings::class,
			\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
			\App\Http\Middleware\TrustProxies::class,
		];
		
		/**
		 * The application's route middleware groups.
		 *
		 * @var array
		 */
		protected $middlewareGroups = [
//			'web' => [
//				\App\Http\Middleware\EncryptCookies::class,
//				\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
//				\Illuminate\Session\Middleware\StartSession::class,
//				\Illuminate\Session\Middleware\AuthenticateSession::class,
//				\Illuminate\View\Middleware\ShareErrorsFromSession::class,
//				\App\Http\Middleware\VerifyCsrfToken::class,
//				\Illuminate\Routing\Middleware\SubstituteBindings::class,
//			],
			
			'api' => [
				'throttle:6000,1',
				'bindings',
			],
		];
		
		/**
		 * The application's route middleware.
		 *
		 * These middleware may be assigned to groups or used individually.
		 *
		 * @var array
		 */
		protected $routeMiddleware = [
			'auth'            => \Illuminate\Auth\Middleware\Authenticate::class,
			'auth.basic'      => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
			'bindings'        => \Illuminate\Routing\Middleware\SubstituteBindings::class,
			'can'             => \Illuminate\Auth\Middleware\Authorize::class,
			'guest'           => \App\Http\Middleware\RedirectIfAuthenticated::class,
			'throttle'        => \Illuminate\Routing\Middleware\ThrottleRequests::class,
			'api.auth'        => \App\Http\Middleware\Auth::class,
			'resource.exists' => \App\Http\Middleware\ResourceExists::class,
		];
	}
