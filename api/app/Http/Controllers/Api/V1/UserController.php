<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;
use Validator;
use App\Models\User;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::orderBy('id')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $req = $request->all();
        if (Validator::make($req,
            [
                'username' => 'required',
                'password' => 'required',
                'email' => 'required',
                'capacity' => 'required'
            ])->fails()) return $this->failed(400000);
        if (Validator::make($req,
            [
                'username' => 'string',
                'password' => 'string',
                'capacity' => 'numeric'
            ])->fails()) return $this->failed(400001);
        if (Validator::make($req,
            [
                'email' => 'email',
                'capacity' => 'between:0,1099511627776'
            ])->fails()) return $this->failed(400002);

        $user = new User();
        $user->username = $req['username'];
        $user->password = bcrypt($req['password']);
        $user->email = $req['email'];
        $user->capacity = $req['capacity'];
        if (!$user->save()) return $this->failed(500001);
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return User::destroy($id);
    }
}
