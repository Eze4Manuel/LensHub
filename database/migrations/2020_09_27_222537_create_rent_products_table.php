<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRentProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('product_id');
            $table->foreignId('user_id');
            $table->string('product_name')->nullable();
            $table->decimal('product_price', 8, 2)->nullable();
            $table->string('category')->nullable();
            $table->string('condition')->nullable();
            $table->string('location')->nullable();
            $table->boolean('negotiable')->nullable();
            $table->string('specifications')->nullable();
            $table->json('photos')->nullable();
            $table->string('address')->nullable();
            $table->string('lga')->nullable();
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('bank')->nullable();
            $table->smallInteger('verification_status')->default(0);

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
        Schema::dropIfExists('products');
    }
}
