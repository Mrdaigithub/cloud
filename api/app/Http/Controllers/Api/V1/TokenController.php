<?php
/**
 * Created by PhpStorm.
 * User: dai
 * Date: 2017/11/25
 * Time: 15:52
 */

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Models\User;

class TokenController extends ApiController
{
    public function login()
    {
        return $this->message('success');
    }
}