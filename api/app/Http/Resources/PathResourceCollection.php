<?php
	
	namespace App\Http\Resources;
	
	use App\Models\Resource;
	use Illuminate\Http\Resources\Json\ResourceCollection;
	
	class PathResourceCollection extends ResourceCollection {
		/**
		 * Transform the resource collection into an array.
		 *
		 * @param  \Illuminate\Http\Request $request
		 *
		 * @return array
		 */
		public function toArray( $request ) {
			return [
				"data" => collect( array_map( function ( $item ) {
					$item["created_at"] = Resource::find( $item["id"] )->created_at->format( "c" );
					$item["updated_at"] = Resource::find( $item["id"] )->updated_at->format( "c" );
					return collect( $item )->except( [ 'pivot', 'hash' ] );
				}, $this->collection->toArray() ) )
					->sortBy( 'file' )->values()
					->sortBy( 'resource_name' )->values()
					->groupBy( 'path' )
			];
		}
	}
