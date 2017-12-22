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
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('is_admin')->default(false);
            $table->unsignedBigInteger('capacity')->default(1048576)->comment('kb');
            $table->unsignedBigInteger('used')->default(0)->comment('kb');
            $table->jsonb('path_structure')->default('[]');
            $table->timestamps();
        });

        Schema::create('user_file', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('file_id')->unsigned();
            $table->string('filename');
            $table->timestamps();
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
        Schema::dropIfExists('user_file');
    }
}
