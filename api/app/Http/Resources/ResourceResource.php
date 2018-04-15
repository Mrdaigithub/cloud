<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class ResourceResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'resource_name' => $this->resource_name,
            'size' => $this->size,
            'file' => $this->file,
            'trashed' => $this->trashed,
            'path' => $this->path,
            'trash_path' => $this->trash_path,
            'created_at' => $this->created_at->format("c"),
            'updated_at' => $this->updated_at->format("c"),
        ];
    }
}
