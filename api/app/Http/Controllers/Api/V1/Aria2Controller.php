<?php
	
	namespace App\Http\Controllers\Api\V1;
	
	use App\Http\Requests\Aria2Requests\AddUriRequest;
	use App\Http\Controllers\Controller;
	use GuzzleHttp\Client as httpClient;
	use Illuminate\Http\Request;
	
	class Aria2Controller extends Controller {
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
			
			return $this->httpClient->post( $this->base_rpc_url, [
				"json" => [
					"id"      => $this->id,
					"jsonrpc" => $this->jsonrpc,
					"method"  => $this->method,
					"params"  => [
						"token:" . env( "ARIA2_SECRET" ),
						[ $request->uri ]
					]
				]
			] )->getBody();
		}
	}
