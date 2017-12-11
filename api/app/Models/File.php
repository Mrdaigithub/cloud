<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'filename', 'file_hash', 'file_size', 'file_type'
    ];
}
