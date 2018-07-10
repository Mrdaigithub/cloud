<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('username')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('origin')->default('local');
            $table->boolean('is_admin')->default(false);
            $table->unsignedBigInteger('capacity')->default(5368709120)->nullable()->comment('byte');
	        $table->string('gids')->nullable();
            $table->timestamps();
        });

        Schema::create('resource_user', function (Blueprint $table) {
            $table->integer('user_id');
            $table->increments('resource_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('resource_user');
    }
}
