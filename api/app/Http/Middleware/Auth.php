<?php
	
	namespace App\Http\Middleware;
	
	use Closure;
	use Illuminate\Validation\ValidationException;
	
	class Auth {
		/**
		 * Handle an incoming request.
		 *
		 * @param  \Illuminate\Http\Request $request
		 * @param  \Closure $next
		 *
		 * @return mixed
		 */
		public function handle( $request, Closure $next ) {
			$authorization = array_key_exists( 'authorization', $request->header() );
			if ( ! $authorization ) {
				throw ValidationException::withMessages( [
					"token" => [ "401000" ],
				] )->status( 401 );
			}
			
			return $next( $request );
		}
	}
