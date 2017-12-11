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
            'capacity' => 102400000000000000,
            'used' => 25600,
            'path_structure' => '["1", "2", "3", {"4": ["5", "6", {"7": ["8", "9", {"10": [11, 12]}]}]}]'
        ]);
    }
}
