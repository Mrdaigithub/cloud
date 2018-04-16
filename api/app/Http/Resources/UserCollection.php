<?php
	
	namespace App\Http\Resources;
	
	use Illuminate\Http\Resources\Json\ResourceCollection;
	use App\Models\User;
	
	class UserCollection extends ResourceCollection {
		/**
		 * Transform the resource collection into an array.
		 *
		 * @param  \Illuminate\Http\Request $request
		 *
		 * @return array
		 */
		public function toArray( $request ) {
			return array_map( function ( $item ) {
				$item["used"]       = (integer) User::find( $item["id"] )
				                                    ->resources()
				                                    ->where( "file", true )
				                                    ->sum( "size" );
				$item["created_at"] = User::find( $item["id"] )->created_at->format( "c" );
				$item["updated_at"] = User::find( $item["id"] )->updated_at->format( "c" );
				
				return $item;
			}, $this->collection->toArray() );
		}
	}
