<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username', 'email'
    ];
    protected $hidden = [
        'password'
    ];

    public function resource()
    {
        return $this->belongsToMany(
            'App\Models\Resource',
            'user_resource',
            'user_id',
            'resource_id'
        );
    }
}
