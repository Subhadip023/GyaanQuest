<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Database\Seeder;

class GKQuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first() ?? User::first();
        
        $quiz = Quiz::create([
            'name' => 'General Knowledge Challenge',
            'description' => 'Test your basic knowledge across various topics like geography, science, and literature.',
            'active' => true,
            'display' => 'public',
            'user_id' => $admin->id,
        ]);

        $data = [
            [
                'question' => 'What is the capital city of France?',
                'answers' => [
                    ['answare' => 'London', 'is_correct' => false],
                    ['answare' => 'Berlin', 'is_correct' => false],
                    ['answare' => 'Paris', 'is_correct' => true],
                    ['answare' => 'Madrid', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'Which planet is known as the Red Planet?',
                'answers' => [
                    ['answare' => 'Venus', 'is_correct' => false],
                    ['answare' => 'Mars', 'is_correct' => true],
                    ['answare' => 'Jupiter', 'is_correct' => false],
                    ['answare' => 'Saturn', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'Who painted the Mona Lisa?',
                'answers' => [
                    ['answare' => 'Vincent van Gogh', 'is_correct' => false],
                    ['answare' => 'Leonardo da Vinci', 'is_correct' => true],
                    ['answare' => 'Pablo Picasso', 'is_correct' => false],
                    ['answare' => 'Claude Monet', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'What is the largest ocean on Earth?',
                'answers' => [
                    ['answare' => 'Atlantic Ocean', 'is_correct' => false],
                    ['answare' => 'Indian Ocean', 'is_correct' => false],
                    ['answare' => 'Arctic Ocean', 'is_correct' => false],
                    ['answare' => 'Pacific Ocean', 'is_correct' => true],
                ]
            ],
            [
                'question' => 'How many continents are there in the world?',
                'answers' => [
                    ['answare' => '5', 'is_correct' => false],
                    ['answare' => '6', 'is_correct' => false],
                    ['answare' => '7', 'is_correct' => true],
                    ['answare' => '8', 'is_correct' => false],
                ]
            ],
        ];

        foreach ($data as $index => $item) {
            $question = Question::create([
                'quiz_id' => $quiz->id,
                'question' => $item['question'],
                'type' => 'mcq',
                'number' => $index + 1,
                'isActive' => true,
                'display' => 'public',
                'user_id' => $admin->id,
            ]);

            foreach ($item['answers'] as $ans) {
                Answer::create([
                    'question_id' => $question->id,
                    'answare' => $ans['answare'],
                    'is_correct' => $ans['is_correct'],
                    'is_long' => false,
                ]);
            }
        }
    }
}
