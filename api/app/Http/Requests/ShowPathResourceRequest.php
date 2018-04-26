<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowPathResourceRequest extends FormRequest
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
            "path" => ["string", "regex:/^0(\.\d+)*$/u"],
        ];
    }

    public function messages()
    {
        return [
            "path.string" => "400003",
            "path.regex" => "400004",
        ];
    }
}
