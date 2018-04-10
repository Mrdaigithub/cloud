<?php
	
	namespace App\Http\Requests;
	
	use Illuminate\Foundation\Http\FormRequest;

    /**
     * @property mixed refresh_token
     */
	class RefreshTokenRequest extends FormRequest {
		
		/**
		 * Determine if the user is authorized to make this request.
		 *
		 * @return bool
		 */
		public function authorize() {
			return true;
		}
		
		/**
		 * Get the validation rules that apply to the request.
		 *
		 * @return array
		 */
		public function rules() {
			return [
				"refreshToken" => "required|string"
			];
		}
		
		public function messages() {
			return [
				'refreshToken.required' => '400000',
				'refreshToken.string'   => '400003',
			];
		}
	}
