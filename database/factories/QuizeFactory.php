<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quize>
 */
class QuizeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'user_id' => 2,
            'display' => $this->faker->randomElement(['public', 'private', 'room']),
            'active' => $this->faker->boolean(50), // 50 -50 

        ];
    }
}
