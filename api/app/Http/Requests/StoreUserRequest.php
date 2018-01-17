<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'username' => 'required|min:4|max:10|string|unique:users,username',
            'password' => 'required|min:4|max:15|string',
            'email' => 'required|email|unique:users,email|unique:users,email',
            'capacity' => 'numeric|between:0,1099511627776'
        ];
    }

    public function messages()
    {
        return [
            'username.required' => '400000',
            'username.min' => '400001',
            'username.max' => '400002',
            'username.string' => '400003',
            'username.unique' => '400006',
            'password.required'  => '400000',
            'password.min'  => '400001',
            'password.max'  => '400002',
            'password.string'  => '400003',
            'email.required'  => '400000',
            'email.email'  => '400004',
            'email.unique'  => '400006',
            'capacity.numeric'  => '400003',
            'capacity.between'  => '400004',
        ];
    }
}
