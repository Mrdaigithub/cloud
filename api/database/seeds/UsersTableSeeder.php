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
            'email' => 'root@gmail.com',
            'password' => bcrypt('root'),
            'is_admin' => true,
            'capacity' => null,
        ]);
        DB::table('users')->insert([
            'username' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('user1'),
            'is_admin' => false,
        ]);
        DB::table('users')->insert([
            'username' => 'user2',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('user2'),
            'is_admin' => false,
        ]);
        DB::table('users')->insert([
            'username' => 'user3',
            'email' => 'user3@gmail.com',
            'password' => bcrypt('user3'),
            'is_admin' => false,

        ]);
        DB::table('users')->insert([
            'username' => 'user4',
            'email' => 'user4@gmail.com',
            'password' => bcrypt('user4'),
            'is_admin' => false,
        ]);
    }
}
