<?php
/**
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
