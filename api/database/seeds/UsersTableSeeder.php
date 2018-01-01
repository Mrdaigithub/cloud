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
        ]);
        DB::table('users')->insert([
            'username' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('user1'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user2',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('user2'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user3',
            'email' => 'user3@gmail.com',
            'password' => bcrypt('user3'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user4',
            'email' => 'user4@gmail.com',
            'password' => bcrypt('user4'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user5',
            'email' => 'user5@gmail.com',
            'password' => bcrypt('user5'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user6',
            'email' => 'user6@gmail.com',
            'password' => bcrypt('user6'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user7',
            'email' => 'user7@gmail.com',
            'password' => bcrypt('user7'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user8',
            'email' => 'user8@gmail.com',
            'password' => bcrypt('user8'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user9',
            'email' => 'user9@gmail.com',
            'password' => bcrypt('user9'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user10',
            'email' => 'user10@gmail.com',
            'password' => bcrypt('user10'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user11',
            'email' => 'user11@gmail.com',
            'password' => bcrypt('user11'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user12',
            'email' => 'user12@gmail.com',
            'password' => bcrypt('user12'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user13',
            'email' => 'user13@gmail.com',
            'password' => bcrypt('user13'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user14',
            'email' => 'user14@gmail.com',
            'password' => bcrypt('user14'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user15',
            'email' => 'user15@gmail.com',
            'password' => bcrypt('user15'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user16',
            'email' => 'user16@gmail.com',
            'password' => bcrypt('user16'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user17',
            'email' => 'user17@gmail.com',
            'password' => bcrypt('user17'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user18',
            'email' => 'user18@gmail.com',
            'password' => bcrypt('user18'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user19',
            'email' => 'user19@gmail.com',
            'password' => bcrypt('user19'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
        DB::table('users')->insert([
            'username' => 'user20',
            'email' => 'user20@gmail.com',
            'password' => bcrypt('user20'),
            'is_admin' => false,
            'capacity' => 10240000,
            'used' => 256,
        ]);
    }
}
