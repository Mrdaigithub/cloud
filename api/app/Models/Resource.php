<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    public function user()
    {
        return $this->hasOne('App\Models\User', 'user_id');
    }
}
