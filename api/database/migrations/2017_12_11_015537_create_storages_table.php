<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateStoragesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storages', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('storage_name');
            $table->string('file_hash')->nullable();
            $table->boolean('file')->default(true);
            $table->timestamps();
        });
        DB::statement("ALTER TABLE storages ADD path ltree NOT NULL");
        DB::statement("CREATE INDEX path_gist_idx ON storages USING gist(path)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('storages');
    }
}
