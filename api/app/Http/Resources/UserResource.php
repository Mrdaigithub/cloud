<?php
	
	namespace App\Http\Resources;
	
	use Illuminate\Http\Resources\Json\Resource;
	use App\Models\User;
	
	class UserResource extends Resource {
		/**
		 * Transform the resource into an array.
		 *
		 * @param  \Illuminate\Http\Request $request
		 *
		 * @return array
		 */
		public function toArray( $request ) {
			return [
				"id"         => $this->id,
				"username"   => $this->username,
				"email"      => $this->email,
				"origin"     => $this->origin,
				"is_admin"   => $this->is_admin,
				"capacity"   => $this->capacity,
				"used"       => $item["used"] = (integer) User::find( $this->id )
				                                              ->resources()
				                                              ->where( "file", true )
				                                              ->sum( "size" ),
				"created_at" => $this->created_at->format( "c" ),
				"updated_at" => $this->updated_at->format( "c" ),
			];
		}
	}
