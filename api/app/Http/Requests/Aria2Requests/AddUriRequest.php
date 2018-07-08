<?php

namespace App\Http\Requests\Aria2Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUriRequest extends FormRequest
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
		    "uri" => ["required", "string", "regex:/^(((https?)|(ftp)):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*)|(magnet:\?xt=urn:btih:.*)$/ui"],
	    ];
    }
	
	public function messages()
	{
		return [
			"uri.required" => "400000",
			"uri.string" => "400003",
			"uri.regex" => "400004",
		];
	}
}
