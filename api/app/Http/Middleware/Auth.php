<?php

namespace App\Http\Middleware;

use Closure;
use Validator;
use Illuminate\Http\Request;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return response(json_encode(Request::header('Content-Type')), 401);
        return $next($request);
    }
}
