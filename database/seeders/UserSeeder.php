<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
          'name' => 'Ezenagu Emmanuel',
          'email' => 'emmanuelezenagu5@gmail.com',
          'email_verified_at' => '2020-06-17 16:41:02',
          'phone' => '08064312363',
          'address' => 'FCDA Owners Occupier Th11, Flat 1',
          'company' => 'Individual',
          'about' => Str::random(149),
          'password' => Hash::make('abcd1234'),
          'created_at' => date('Y/m/d H:i:s'),
          'updated_at' => date('Y/m/d H:i:s'),
      ]);
    }
}
