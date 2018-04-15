<?php
	
	namespace App\Models;
	
	use Laravel\Passport\HasApiTokens;
	use Illuminate\Notifications\Notifiable;
	use Illuminate\Foundation\Auth\User as Authenticatable;
	
	class User extends Authenticatable {
		use HasApiTokens, Notifiable;
		
		protected $table = 'users';
		
		protected $fillable = [
			'username',
			'email'
		];
		protected $hidden = [
			'password'
		];
		
		public function resources() {
			return $this->belongsToMany( 'App\Models\Resource' );
		}
	}
