<?php

use Illuminate\Database\Seeder;

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
            'password' => bcrypt('root'),
        ]);
        DB::table('users')->insert([
            'username' => 'user1',
            'password' => bcrypt('user1'),
        ]);
        DB::table('users')->insert([
            'username' => 'user2',
            'password' => bcrypt('user2'),
        ]);
    }
}
