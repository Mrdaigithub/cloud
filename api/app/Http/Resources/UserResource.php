<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use App\Models\User;

class UserResource extends Resource
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
            'username' => $this->username,
            'email' => $this->email,
            'is_admin' => $this->is_admin,
            'capacity' => $this->capacity,
            'used' => $item['used'] = User::find($this->id)
                ->resource()
                ->where('file', true)
                ->sum('size'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
