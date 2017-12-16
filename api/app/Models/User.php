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

    public function file()
    {
        return $this->belongsToMany('App\Models\File', 'user_file', 'user_id', 'file_id')
            ->withPivot('filename')
            ->withTimestamps();
    }
}
