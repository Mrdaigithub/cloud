<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateResourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('resource_name');
            $table->string('hash')->nullable();
            $table->string('mime')->nullable();
            $table->boolean('file')->default(true);
            $table->timestamps();
        });
        DB::statement("ALTER TABLE resources ADD path ltree NOT NULL DEFAULT '0'");
        DB::statement("CREATE INDEX path_gist_idx ON resources USING gist(path)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resources');
    }
}
