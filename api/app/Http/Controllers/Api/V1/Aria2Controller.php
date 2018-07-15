<?php
	
	namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Controllers\Api\ApiController;
	use App\Http\Requests\Aria2Requests\AddUriRequest;
	use App\Http\Requests\Aria2Requests\DownloadCompleteRequest;
	use App\Models\Resource;
	use App\Models\User;
	use Exception;
	use GuzzleHttp\Client as httpClient;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Redis;
	
	class Aria2Controller extends ApiController {
		private $httpClient;
		private $jsonrpc;
		private $method;
		private $id;
		private $base_rpc_url;
		
		public function __construct() {
			$this->httpClient   = new httpClient;
			$this->jsonrpc      = env( "ARIA2_VERSION" );
			$this->base_rpc_url = env( "ARIA2_RPC_URL" );
		}
		
		private function rename( $resource, $index ) {
			if ( Resource::where( "path", $resource->path )
			             ->where( "resource_name", $resource->resource_name )
			             ->count() > 1 ) {
				rename( $resource->resource_name, $index ++ );
			} else {
				return $resource->resource_name . " (" . $index . ")";
			}
		}
		
		/**
		 * 添加Aria2下载任务
		 *
		 * @param AddUriRequest $request
		 *
		 * @return array
		 */
		public function add_uri( AddUriRequest $request ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.addUri";
			
			$gid = json_decode( $this->httpClient->post( $this->base_rpc_url, [
				"json" => [
					"id"      => $this->id,
					"jsonrpc" => $this->jsonrpc,
					"method"  => $this->method,
					"params"  => [
						"token:" . env( "ARIA2_SECRET" ),
						[ $request->uri ]
					]
				]
			] )->getBody()->getContents() )->result;
			
			Redis::HSET( env( "REDIS_GID_UID" ), $gid, $this->id );
			
			return [ "gid" => $gid ];
		}
		
		/**
		 * 查询此用户的aria2任务状态
		 *
		 * @param Request $request
		 *
		 * @return array
		 */
		public function get_task_state( Request $request ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.tellStatus";
			$list         = [];
			$gids         = $request->user()->gids;
			
			if ( $gids ) {
				$gid_list = explode( ",", trim( $gids ) );
				foreach ( $gid_list as $gid ) {
					array_push( $list, json_decode( $this->httpClient->post( $this->base_rpc_url, [
						"json" => [
							"id"      => $this->id,
							"jsonrpc" => $this->jsonrpc,
							"method"  => $this->method,
							"params"  => [
								"token:" . env( "ARIA2_SECRET" ),
								$gid
							]
						]
					] )->getBody()->getContents() ) );
				}
			}
			
			return $list;
		}
		
		/**
		 * 暂停单个Aria2任务
		 *
		 * @param Request $request
		 * @param $gid
		 *
		 * @return mixed
		 */
		public function pause_task( Request $request, $gid ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.pause";
			
			try {
				$this->httpClient->post( $this->base_rpc_url, [
					"json" => [
						"id"      => $this->id,
						"jsonrpc" => $this->jsonrpc,
						"method"  => $this->method,
						"params"  => [
							"token:" . env( "ARIA2_SECRET" ),
							$gid
						]
					]
				] );
			} catch ( Exception $exception ) {
			}
			
			return $gid;
		}
		
		/**
		 * 重启暂停的Aria2任务
		 *
		 * @param Request $request
		 * @param $gid
		 *
		 * @return mixed
		 */
		public function unpause_task( Request $request, $gid ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.unpause";
			
			try {
				$this->httpClient->post( $this->base_rpc_url, [
					"json" => [
						"id"      => $this->id,
						"jsonrpc" => $this->jsonrpc,
						"method"  => $this->method,
						"params"  => [
							"token:" . env( "ARIA2_SECRET" ),
							$gid
						]
					]
				] );
			} catch ( Exception $exception ) {
			}
			
			return $gid;
		}
		
		/**
		 * 删除此用户aria2下载任务
		 *
		 * @param Request $request
		 * @param $gid
		 */
		public function remove_task( Request $request, $gid ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.removeDownloadResult";
			$user         = User::find( $request->user()->id );
			$gids_array   = explode( ",", trim( $user->gids ) );
			
			$arr = array_flip( $gids_array );
			unset( $arr[ $gid ] );
			$gids_array = array_flip( $arr );
			$user->gids = implode( ",", $gids_array );
			$this->save_model( $user );
			
			try {
				$this->httpClient->post( $this->base_rpc_url, [
					"json" => [
						"id"      => $this->id,
						"jsonrpc" => $this->jsonrpc,
						"method"  => $this->method,
						"params"  => [
							"token:" . env( "ARIA2_SECRET" ),
							$gid
						]
					]
				] );
			} catch ( Exception $exception ) {
			}
			
			return;
		}
		
		/**
		 * Aria2 下载完成时将文件名, md5, size, gid 录入resources表
		 *
		 * @param DownloadCompleteRequest $request
		 *
		 * @return Resource
		 */
		public function download_complete( DownloadCompleteRequest $request, $gid ) {
//			$resource                = new Resource();
//			$resource->resource_name = $request->resource_name;
//			$resource->hash          = $request->hash;
//			$resource->gid           = $gid;
//			$resource->size          = $request->size;
//			$resource->file          = true;
//			$this->save_model( $resource );
//
//			$user_id = Redis::HGET( env( "REDIS_GID_UID" ), $gid );
//			User::find( $user_id )->resources()->attach( $resource->id );
			
			$resource = Resource::find( 16 );
			
			// 如果已经有同名文件则重命名
			return $this->rename( $resource, 0 );
			
			return $resource;
		}
	}
