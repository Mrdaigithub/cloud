<?php

namespace App\Http\Middleware;

use Closure;
use Validator;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authorization = array_key_exists('authorization', $request->header());
        if (!$authorization) {
            return response(json_encode(['message' => '401001', 'code' => 401, 'status' => 'error']), 401);
        }
        return $next($request);
    }
}
