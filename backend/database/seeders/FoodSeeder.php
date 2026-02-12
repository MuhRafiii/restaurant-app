<?php

namespace Database\Seeders;

use App\Models\Food;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('foods')->insert([
            [
                'name' => 'Nasi Goreng',
                'price' => 20000,
                'description' => 'Nasi goreng spesial'
            ],
            [
                'name' => 'Mie Ayam',
                'price' => 15000,
                'description' => 'Mie ayam kampung'
            ],
            [
                'name' => 'Es Teh',
                'price' => 5000,
                'description' => 'Minuman segar'
            ]
        ]);
    }
}
