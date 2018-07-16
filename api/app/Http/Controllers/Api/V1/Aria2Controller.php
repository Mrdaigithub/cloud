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
	
	/**
	 * 拼接文件名　a.tar.gz -> a(1).tar.gz
	 *
	 * @param $name
	 * @param int $index
	 *
	 * @return string
	 */
	private function deal_name( $name, $index = 0 ) {
		$basename        = pathinfo( $name )["basename"];
		$basename_arr    = explode( ".", $basename );
		$basename_arr[0] = $index == 0 ? $basename_arr[0] : $basename_arr[0] . "(" . $index . ")";
		
		return implode( ".", $basename_arr );
	}
	
	/**
	 * 重命名重名文件
	 *
	 * @param $name
	 * @param string $path
	 * @param int $index
	 *
	 * @return string
	 */
	private function rename( $name, $uid, $path = "0", $index = 0 ) {
		
		while ( true ) {
			$_name = $this->deal_name( $name, $index ++ );
			if ( User::find( $uid )
			         ->resources()
			         ->where( "path", $path )
			         ->where( "resource_name", $_name )
			         ->count() == 0 ) {
				return $_name;
			}
		}
	}
	
	/**
	 * 获取gid列表通过uid
	 *
	 * @param $uid
	 *
	 * @return array
	 */
	private function get_gid_by_uid( $uid ) {
		$gid_list     = [];
		$gid_uid_list = Redis::HGETALL( env( "REDIS_GID_UID" ) );
		foreach ( $gid_uid_list as $key => $value ) {
			if ( $value == $uid ) {
				array_push( $gid_list, $key );
			}
		}
		
		return $gid_list;
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
		$user         = $request->user();
		$this->id     = $user->id;
		$this->method = "aria2.tellStatus";
		
		$gid_list = $this->get_gid_by_uid( $this->id );
		
		$list = [];
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
		$user     = $request->user();
		$this->id = $user->id;
		
		try {
			$this->httpClient->post( $this->base_rpc_url, [
				"json" => [
					"id"      => $this->id,
					"jsonrpc" => $this->jsonrpc,
					"method"  => "aria2.remove",
					"params"  => [
						"token:" . env( "ARIA2_SECRET" ),
						$gid
					]
				]
			] );
			$this->httpClient->post( $this->base_rpc_url, [
				"json" => [
					"id"      => $this->id,
					"jsonrpc" => $this->jsonrpc,
					"method"  => "aria2.removeDownloadResult",
					"params"  => [
						"token:" . env( "ARIA2_SECRET" ),
						$gid
					]
				]
			] );
		} catch ( Exception $exception ) {
		}
		
		$resource_id = $user->resources()->where( "gid", $gid )->first()["id"];
		if ( $resource_id ) {
			$user->resources()->detach( $resource_id );
			Resource::destroy( $resource_id );
		}
		Redis::HDEL( env( "REDIS_GID_UID" ), $gid );
		
		return;
	}
	
	/**
	 * Aria2 下载完成时将文件名, md5, size, gid 录入resources表
	 *
	 * @param DownloadCompleteRequest $request
	 * @param $gid
	 *
	 * @return string
	 */
	public function download_complete( DownloadCompleteRequest $request, $gid ) {
		$uid = Redis::HGET( env( "REDIS_GID_UID" ), $gid );
		
		$resource = new Resource();
		
		$resource->resource_name = $this->rename( $request->resource_name, $uid );
		$resource->hash          = $request->hash;
		$resource->gid           = $gid;
		$resource->size          = $request->size;
		$resource->file          = true;
		$this->save_model( $resource );
		
		User::find( $uid )->resources()->attach( $resource->id );
		
		return Resource::find( $resource->id );
	}
}
	