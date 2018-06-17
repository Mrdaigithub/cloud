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
	
	use Illuminate\Http\Request;
	use App\Http\Controllers\Api\ApiController;
	use App\Http\Resources\UserCollection;
	use App\Http\Resources\UserResource;
	use App\Models\User;
	use App\Models\Resource;
	
	
	class UserController extends ApiController {
		/**
		 * Display a users listing of the resource.
		 *
		 * @return UserCollection
		 */
		public function index() {
			return new UserCollection( User::orderBy( 'id' )->get() );
		}
		
		/**
		 * Store a newly created user in storage.
		 *
		 * @param \App\Http\Requests\StoreUserRequest $request
		 *
		 * @return UserResource|mixed
		 */
		public function store( \App\Http\Requests\StoreUserRequest $request ) {
			$user           = new User();
			$user->username = $request->get( 'username' );
			$user->password = bcrypt( $request->get( 'password' ) );
			$user->email    = $request->get( 'email' );
			$request->has( 'capacity' ) ? $user->capacity = $request->get( 'capacity' ) : null;
			if ( ! $user->save() ) {
				throw ValidationException::withMessages( [
					"resource" => [ "500001" ],
				] )->status( 500 );
			}
			
			return new UserResource( User::find( $user->id ) );
		}
		
		/**
		 * Display the user.
		 *
		 * @param Request $request
		 * @param $id
		 *
		 * @return UserResource
		 */
		public function show( Request $request, $id ) {
			if ( $id == 0 ) {
				return new UserResource( $request->user() );
			}
			
			return new UserResource( Resource::find( $id ) );
		}
		
		/**
		 * Update the user in storage.
		 *
		 * @param \App\Http\Requests\UpdateUserRequest $request
		 * @param $id
		 *
		 * @return UserResource|mixed
		 */
		public function update( \App\Http\Requests\UpdateUserRequest $request, $id ) {
			$user = User::find( $id );
			$request->has( 'username' ) ? $user->username = $request->get( 'username' ) : null;
			$request->has( 'password' ) ? $user->password = bcrypt( $request->get( 'password' ) ) : null;
			$request->has( 'email' ) ? $user->email = $request->get( 'email' ) : null;
			$request->has( 'capacity' ) ? $user->capacity = $request->get( 'capacity' ) : null;
			if ( ! $user->save() ) {
				throw ValidationException::withMessages( [
					"resource" => [ "500001" ],
				] )->status( 500 );
			}
			
			return new UserResource( User::find( $id ) );
		}
		
		/**
		 * Remove the user with resources from storage.
		 *
		 * @param $id
		 */
		public function destroy( $id ) {
			$user = User::find( $id );
			$user->resources()->each( function ( $item, $key ) {
				Resource::destroy( $item->id );
			} );
			$user->resources()->detach();
			User::destroy( $id );
		}
	}
