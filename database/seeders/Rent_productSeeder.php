<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Rent_productSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('products')->insert([
        'user_id' => 1,
        'product_name' => Str::random(10),
         'product_price' => mt_rand(100000.99, 999999.99),
         'category' => Str::random(8),
         'location' => Str::random(8),
         'negotiable' => true,
         'condition' => Str::random(8),
         'specifications' => Str::random(150),
       ]);
    }
}
