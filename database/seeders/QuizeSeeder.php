<?php

namespace Database\Seeders;

use App\Models\Quize;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quize::factory()->count(50)->create();

    }
}
