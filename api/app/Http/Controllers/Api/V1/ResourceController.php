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
	
	namespace App\Http\Controllers\Api\V1;
	
	use function GuzzleHttp\Psr7\parse_query;
	use Illuminate\Http\Request;
	use Illuminate\Validation\ValidationException;
	use Illuminate\Support\Facades\Storage;
	use Illuminate\Support\Facades\DB;
	use App\Http\Controllers\Api\ApiController;
	use App\Http\Resources\PathResourceCollection;
	use App\Http\Resources\ResourceResource;
	use App\Http\Requests\UpdateResourceRequest;
	use App\Http\Requests\StoreResourceRequest;
	use App\Http\Requests\MoveResourceRequest;
	use App\Http\Requests\ShowPathResourceRequest;
	use App\Http\Requests\SearchResourceRequest;
	use App\Models\Resource;
	
	
	class ResourceController extends ApiController {
		
		/**
		 * Display a listing of the resource.
		 *
		 * @param Request $request
		 *
		 * @return PathResourceCollection
		 */
		public function index( Request $request ) {
			return new PathResourceCollection( $request->user()->resources()->get() );
		}
		
		/**
		 * Store a newly created resource in storage.
		 *
		 * @param StoreResourceRequest $request
		 *
		 * @return ResourceResource
		 */
		public function store( StoreResourceRequest $request ) {
			$resource = new resource();
			$user     = $request->user();
			if ( ! ! $user->resources
				->where( "resource_name", $request->get( "resource_name" ) )
				->where( "path", $request->get( "path" ) )
				->where( "trashed", false )->count() ) {
				throw ValidationException::withMessages( [
					"resource" => [ "400006" ],
				] )->status( 400 );
			}
			$resource->resource_name = $request->get( "resource_name" );
			$resource->file          = false;
			$resource->path          = $request->get( "path" );
			$this->save_model( $resource );
			$user->resources()->attach( $resource->id );
			
			return new ResourceResource( Resource::find( $resource->id ) );
		}
		
		/**
		 * Display the specified resource.
		 *
		 * @param  int $id
		 *
		 * @return \Illuminate\Http\Response
		 */
		public function show( $id ) {
			//
		}
		
		/**
		 * Display the specified resource.
		 *
		 * @param \App\Http\Requests\ShowPathResourceRequest $request
		 * @param $path
		 *
		 * @return PathResourceCollection
		 */
		public function show_with_path( ShowPathResourceRequest $request, $path ) {
			return new PathResourceCollection( $request->user()->resources()->where( "path", $path )->get() );
		}
		
		public function preview( $id ) {
			$storage_path = storage_path( "app/aetherupload/file/md5_files" );
			$resource     = Resource::find( $id );
			$files        = Storage::files();
			$file         = array_filter( $files, function ( $file ) use ( $resource ) {
				return str_contains( $file, $resource->hash );
			} );
			if ( ! count( $file ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "400005" ],
				] )->status( 400 );
			}
			$file       = $file[ key( $file ) ];
			$image_info = getimagesize( "$storage_path/$file" );
			$img_data   = file_get_contents( "$storage_path/$file" );
			
			return "data:" . $image_info["mime"] . ";base64," . base64_encode( $img_data );
		}
		
		/**
		 * Search the resource
		 *
		 * @param \App\Http\Requests\SearchResourceRequest $request
		 *
		 * @return mixed
		 */
		public function search( SearchResourceRequest $request ) {
			$query = $request->input( "q" );
			
			return DB::select( "SELECT id, resource_name, file, path, created_at, updated_at
              FROM resources
              LEFT JOIN resource_user ON resources.id = resource_user.resource_id
              WHERE user_id=? AND file=? AND trashed=? AND resource_name LIKE ?
              ORDER BY file DESC , resource_name",
				[ $request->user()->id, true, false, "%$query%" ] );
		}
		
		/**
		 * Get the download link
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed|string
		 */
		public function get_download_link( Request $request, $id ) {
			if ( ! $request->user()->resources()->find( $id ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			$source = "id=$id&creater=" . $request->user()->id . "&v=public&t=" . time();
			$secret = encrypt( encrypt( $source ) );
			
			return [ "url" => $_SERVER["API_DOMAIN"] . "api/v1/resources/download/$secret" ];
		}
		
		/**
		 * 获取分享资源的secret和提取码
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed|string
		 */
		public function get_share_secret( Request $request, $visibility, $id ) {
			if ( ! $request->user()->resources()->find( $id ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			
			/**
			 * 先一次加密提取第100位字符的后4位字符作为提取码
			 * 将之前的密文二次加密作为资源的secret发送至客户端
			 */
			$source           = "id=$id&creater=" . $request->user()->id . "&v=$visibility&t=" . time();
			$once_encrypt     = encrypt( $source );
			$twice_encrypt    = encrypt( $once_encrypt );
			$once_encrypt_arr = str_split( $once_encrypt );
			$extract_code     = implode( "", array_splice( $once_encrypt_arr, 100, 4 ) );
			
			$res = [
				"secret" => $twice_encrypt,
			];
			if ( $visibility == "private" ) {
				$res["extract_code"] = $extract_code;
			}
			
			return $res;
		}
		
		/**
		 * 验证下载分享资源的提取码
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed|string
		 */
		public function verify_share_extract_code( Request $request, $secret ) {
			$onece_decrypt     = decrypt( $secret );
			$onece_decrypt_arr = str_split( $onece_decrypt );
			$source            = decrypt( $onece_decrypt );
			$resource_id       = parse_query( $source )['id'];
			$creater           = parse_query( $source )['creater'];
			$visibility        = parse_query( $source )['v'];
			$time              = parse_query( $source )['t'];
			$extract_code      = $request->extract_code;
			
			if ( ! Resource::find( $resource_id ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			
			if ( ( time() - $time ) > env( "DOWNLOAD_LINK_TIMEOUT" ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "504000" ],
				] )->status( 504 );
			}
			
			if ( $visibility == 'private'
			     && $extract_code != implode( "", array_splice( $onece_decrypt_arr, 100, 4 ) ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "403001" ],
				] )->status( 403 );
			}
			
			$source = "id=$resource_id&creater=$creater&v=$visibility&t=" . time();
			$secret = encrypt( encrypt( $source ) );
			
			return [ "url" => "//" . $_SERVER["SERVER_NAME"] . "/api/v1/resources/download/$secret" ];
		}
		
		/**
		 * Download the resource by secret url
		 *
		 * @param $secret
		 *
		 * @return mixed|\Symfony\Component\HttpFoundation\BinaryFileResponse
		 */
		public function download( $secret ) {
			$once_decrypt = decrypt( $secret );
			$source       = decrypt( $once_decrypt );
			$t            = parse_query( $source )["t"];
			
			if ( ( time() - $t ) > env( "DOWNLOAD_LINK_TIMEOUT" ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "504000" ],
				] )->status( 504 );
			}
			
			$storage_path  = storage_path( "app/aetherupload/file/md5_files" );
			$resource      = Resource::find( parse_query( $source )["id"] );
			$files         = Storage::files();
			$download_file = array_filter( $files, function ( $file ) use ( $resource ) {
				return str_contains( $file, $resource->hash );
			} );
			if ( ! count( $download_file ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			$download_file = $download_file[ key( $download_file ) ];
			
			return response()->download( "$storage_path/$download_file", $resource->resource_name );
		}
		
		/**
		 * Move resource to the path
		 *
		 * @param \App\Http\Requests\MoveResourceRequest $request
		 * @param $id
		 *
		 * @return mixed
		 */
		public function move( MoveResourceRequest $request, $id ) {
			$user      = $request->user();
			$resource  = Resource::find( $id );
			$base_path = $resource->path;
			$new_path  = $request->get( "path" );
			$old_path  = "$base_path.$id";
			if ( DB::select( "SELECT text2ltree('$new_path') <@ text2ltree('$old_path') is_child;" )[0]->is_child ) {
				throw ValidationException::withMessages( [
					"resource" => [ "500000" ],
				] )->status( 500 );
				
			} elseif ( Resource::where( "path", $new_path )->where( "resource_name", $resource->resource_name )->exists() ) {
				throw ValidationException::withMessages( [
					"resource" => [ "400006" ],
				] )->status( 400 );
			}
			$move_id_list = DB::select( "SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ?
                          ORDER BY file ,created_at ASC;",
				[ $user->id, $old_path ] );
			$move_id_list = array_map( function ( $item ) {
				return $item->id;
			}, $move_id_list );
			array_push( $move_id_list, $id );
			foreach ( $move_id_list as $move_id ) {
				$resource       = Resource::find( $move_id );
				$resource->path = preg_replace( "/($base_path)/", $new_path, $resource->path );
				$this->save_model( $resource );
			}
			
			return new ResourceResource( $resource );
		}
		
		/**
		 * Update the specified resource in storage.
		 *
		 * @param UpdateResourceRequest $request
		 * @param $id
		 *
		 * @return mixed
		 */
		public function update( UpdateResourceRequest $request, $id ) {
			$resource = Resource::find( $id );
			
			if ( $request->has( "resource_name" ) ) {
				if ( Resource::where( 'resource_name', $request->resource_name )
				             ->where( 'path', $resource->path )
				             ->where( 'trashed', false )
				             ->count() ) {
					throw ValidationException::withMessages( [
						"resource" => [ "400006" ],
					] )->status( 400 );
				}
				$resource->resource_name = $request->get( "resource_name" );
			}
			$this->save_model( $resource );
			
			return new ResourceResource( $resource );
		}
		
		/**
		 * trash resource
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed
		 */
		public function trash_resource( Request $request, $id ) {
			$user      = $request->user();
			$resource  = Resource::find( $id );
			$base_path = $resource->path;
			$path      = $resource->path . ".$id";
			if ( $resource->file ) {
				$resource->trashed = true;
				$this->save_model( $resource );
				
				return $resource;
			}
			$trash_id_list = DB::select( "SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
				[ $user->id, $path, false ] );
			$trash_id_list = array_map( function ( $item ) {
				return $item->id;
			}, $trash_id_list );
			array_push( $trash_id_list, $id );
			foreach ( $trash_id_list as $trash_id ) {
				$resource             = Resource::find( $trash_id );
				$resource->trashed    = true;
				$resource->trash_path = preg_replace( "/($base_path)/", "0", $resource->path );
				$this->save_model( $resource );
			}
			
			return new ResourceResource( $resource );
		}
		
		/**
		 * restore the resource
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed
		 */
		public function restore( Request $request, $id ) {
			$user     = $request->user();
			$resource = Resource::find( $id );
			if ( ! $resource ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			if ( $user->resources
				     ->where( "path", $resource->path )
				     ->where( "resource_name", $resource->resource_name )
				     ->count() > 1 ) {
				throw ValidationException::withMessages( [
					"resource" => [ "400006" ],
				] )->status( 400 );
			}
			$restore_id_list = DB::select( "SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND trash_path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
				[ $user->id, $resource->trash_path . ".$id", true ] );
			$restore_id_list = array_map( function ( $item ) {
				return $item->id;
			}, $restore_id_list );
			array_push( $restore_id_list, $id );
			foreach ( $restore_id_list as $restore_id ) {
				$resource             = Resource::find( $restore_id );
				$resource->trashed    = false;
				$resource->trash_path = "0";
				$this->save_model( $resource );
			}
			
			return new ResourceResource( $resource );
		}
		
		/**
		 * Remove the specified resource from storage.
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return mixed
		 */
		public function destroy( Request $request, $id ) {
			if ( ! Resource::find( $id ) ) {
				throw ValidationException::withMessages( [
					"resource" => [ "409001" ],
				] )->status( 409 );
			}
			$user              = $request->user();
			$base_path         = Resource::find( $id )->path;
			$path              = Resource::find( $id )->path . "." . $id;
			$trash_path        = Resource::find( $id )->trash_path . "." . $id;
			$remove_id_list    = DB::select( "SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND trash_path <@ ? AND trashed=?
                          ORDER BY file ,created_at ASC;",
				[ $user->id, $trash_path, true ] );
			$old_child_id_list = DB::select( "SELECT id FROM resources
                          LEFT JOIN resource_user ON resources.id = resource_user.resource_id
                          WHERE user_id=? AND path <@ ?
                          ORDER BY file ,created_at ASC;",
				[ $user->id, $path ] );
			if ( count( $old_child_id_list ) ) {
				foreach ( $old_child_id_list as $child_id ) {
					$resource       = Resource::find( $child_id->id );
					$resource->path = preg_replace( "/($path)/", $base_path, $resource->path );
					$this->save_model( $resource );
				}
			}
			$request->user()->resources()->detach( $id );
			Resource::destroy( $id );
			if ( count( $remove_id_list ) ) {
				foreach ( $remove_id_list as $remove_id ) {
					$request->user()->resources()->detach( $remove_id->id );
					Resource::destroy( $remove_id->id );
				}
			}
			
			return;
		}
	}
