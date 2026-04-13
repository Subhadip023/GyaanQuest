<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Database\Seeder;

class ScienceQuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first() ?? User::first();
        
        $quiz = Quiz::create([
            'name' => 'Science Wonders',
            'description' => 'Explore the fascinating world of science, from atoms to galaxies.',
            'active' => true,
            'display' => 'public',
            'user_id' => $admin->id,
        ]);

        $data = [
            [
                'question' => 'What is the chemical symbol for water?',
                'answers' => [
                    ['answare' => 'O2', 'is_correct' => false],
                    ['answare' => 'H2O', 'is_correct' => true],
                    ['answare' => 'CO2', 'is_correct' => false],
                    ['answare' => 'NaCl', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'What gas do plants primarily absorb from the atmosphere?',
                'answers' => [
                    ['answare' => 'Oxygen', 'is_correct' => false],
                    ['answare' => 'Nitrogen', 'is_correct' => false],
                    ['answare' => 'Carbon dioxide', 'is_correct' => true],
                    ['answare' => 'Hydrogen', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'What is the hardest natural substance on Earth?',
                'answers' => [
                    ['answare' => 'Gold', 'is_correct' => false],
                    ['answare' => 'Iron', 'is_correct' => false],
                    ['answare' => 'Diamond', 'is_correct' => true],
                    ['answare' => 'Quartz', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'Which planet is known as the "Morning Star"?',
                'answers' => [
                    ['answare' => 'Mars', 'is_correct' => false],
                    ['answare' => 'Venus', 'is_correct' => true],
                    ['answare' => 'Jupiter', 'is_correct' => false],
                    ['answare' => 'Mercury', 'is_correct' => false],
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
