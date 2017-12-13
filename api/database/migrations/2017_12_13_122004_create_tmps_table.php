<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTmpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tmps', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('tmp_name_hash');
            $table->string('real_file');
            $table->string('real_file_hash');
            $table->unsignedInteger('all_tmp_num');
            $table->unsignedInteger('tmp_index');
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
        Schema::dropIfExists('tmps');
    }
}
