<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username', 'password'
    ];
    protected $hidden = [
        'password'
    ];

    public static function findFOrPassport($email)
    {
        return self::where('email', $email)->first();
    }
}
