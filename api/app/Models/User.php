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

    public function storage()
    {
        return $this->belongsToMany(
            'App\Models\Storage',
            'user_storage',
            'user_id',
            'storage_id'
        );
    }
}
