<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "username" => "min:4|max:10|string",
            "password" => "min:4|max:15|string",
            "email" => "email",
            "capacity" => "numeric|between:0,1099511627776"
        ];
    }

    public function messages()
    {
        return [
            "username.min" => "400001",
            "username.max" => "400002",
            "username.string" => "400003",
            "password.min"  => "400001",
            "password.max"  => "400002",
            "password.string"  => "400003",
            "email.email"  => "400004",
            "capacity.numeric"  => "400003",
            "capacity.between"  => "400004",
        ];
    }
}
