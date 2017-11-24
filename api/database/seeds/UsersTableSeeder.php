<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'root',
            'password' => Hash::make('root')
        ]);
        DB::table('users')->insert([
            'username' => 'user1',
            'password' => Hash::make('user1')
        ]);
        DB::table('users')->insert([
            'username' => 'user2',
            'password' => Hash::make('user2')
        ]);
    }
}
