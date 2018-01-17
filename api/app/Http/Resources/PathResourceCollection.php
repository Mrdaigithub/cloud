<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PathResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return collect(array_map(function ($item) {
            return collect($item)->except(['pivot', 'hash']);
        }, $this->collection->toArray()))
            ->sortBy('file')->values()
            ->sortBy('resource_name')->values()
            ->groupBy('path');
    }
}
