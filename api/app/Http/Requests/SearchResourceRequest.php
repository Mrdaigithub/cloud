<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchResourceRequest extends FormRequest
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
            "q" => "required|max:50|string"
        ];
    }

    public function messages()
    {
        return [
            "q.required" => "400000",
            "q.max" => "400002",
            "q.string" => "400003",
        ];
    }
}
