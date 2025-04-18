<?php

namespace Database\Factories;

use App\Models\Quize;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question'=>$this->faker->paragraph,
            'type' => $this->faker->randomElement(['mcq','true_false','saq','long']),
            'quizes_id'=>Quize::factory(),
            'number' => $this->faker->numberBetween(1,5),
            'isActive' => $this->faker->boolean(80),
            'user_id' => User::factory(),
            'display' => $this->faker->randomElement(['public','private','room']),

        ];
    }
}
