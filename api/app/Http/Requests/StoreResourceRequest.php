<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResourceRequest extends FormRequest
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
            'resource_name' => 'required|max:50|string',
            'path' => ['string', 'regex:/^0(\.\d+)*$/u'],
        ];
    }

    public function messages()
    {
        return [
            'resource_name.required' => '400000',
            'resource_name.max' => '400002',
            'resource_name.string' => '400003',
            'path.string' => '400003',
            'path.regex' => '400004',
        ];
    }
}
