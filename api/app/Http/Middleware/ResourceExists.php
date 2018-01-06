<?php

namespace App\Http\Middleware;

use Closure;
use App\Helpers\Api\ApiResponse;
use Illuminate\Support\Facades\DB;


class ResourceExists
{
    use ApiResponse;

    /**
     * @param $path
     * @return string
     */
    private function deal_path($path)
    {
        $path = array_filter(
            array_map(function ($item) {
                return trim("$item.");
            }, explode(".", trim($path, '0.'))),
            function ($item) {
                return !!$item;
            });
        return trim('0.' . implode('', $path), '.');
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $uid = $request->user()->id;
        $path = $this->deal_path($request->only('path')['path']);
        $resource_name = $request->only('file_name')['file_name'];
        if (DB::select("SELECT count(id)
              FROM resources
              LEFT JOIN user_resource ON resources.id = user_resource.resource_id
              WHERE user_id=? AND path ~ ? AND resource_name=?",
                [$uid, $path, $resource_name])[0]->count != 0) {
            return $this->failed(409000);
        }
        return $next($request);
    }
}
