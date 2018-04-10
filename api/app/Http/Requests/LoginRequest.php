<?php
	
	namespace App\Http\Requests;
	
	use Illuminate\Foundation\Http\FormRequest;
	
	class LoginRequest extends FormRequest {
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
				'username' => 'required|min:4|max:10|string|exists:users,username',
				'password' => 'required|min:4|max:15|string',
			];
		}
		
		public function messages() {
			return [
				'username.required' => '400000',
				'username.min'      => '400001',
				'username.max'      => '400002',
				'username.string'   => '400003',
				'username.exists'   => '400005',
				'password.required' => '400000',
				'password.min'      => '400001',
				'password.max'      => '400002',
				'password.string'   => '400003',
			];
		}
	}
