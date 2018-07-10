<?php
	
	namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Controllers\Api\ApiController;
	use Illuminate\Validation\ValidationException;
	use App\Http\Requests\Aria2Requests\AddUriRequest;
	use App\Models\User;
	use GuzzleHttp\Client as httpClient;
	use Illuminate\Http\Request;
	
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
		
		/**
		 * 添加Aria2下载任务
		 *
		 * @param AddUriRequest $request
		 *
		 * @return \Psr\Http\Message\StreamInterface
		 */
		public function add_uri( AddUriRequest $request ) {
			$this->id     = $request->user()->id;
			$this->method = "aria2.addUri";
			$user         = User::find( $this->id );
			$gids_array   = explode( ",", trim( $user->gids ) );
			
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
			
			if ( ! in_array( $gid, $gids_array ) ) {
				array_push( $gids_array, $gid );
				$user->gids = $user->gids ? implode( ",", $gids_array ) : $gid;
			}
			$this->save_model( $user );
			
			return $user;
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
	}
