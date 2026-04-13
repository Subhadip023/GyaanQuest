<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Database\Seeder;

class HistoryQuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first() ?? User::first();
        
        $quiz = Quiz::create([
            'name' => 'History Hall of Fame',
            'description' => 'Travel back in time and test your knowledge of historical events and figures.',
            'active' => true,
            'display' => 'public',
            'user_id' => $admin->id,
        ]);

        $data = [
            [
                'question' => 'Who was the first President of the United States?',
                'answers' => [
                    ['answare' => 'Thomas Jefferson', 'is_correct' => false],
                    ['answare' => 'Abraham Lincoln', 'is_correct' => false],
                    ['answare' => 'George Washington', 'is_correct' => true],
                    ['answare' => 'John Adams', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'In which year did World War II end?',
                'answers' => [
                    ['answare' => '1918', 'is_correct' => false],
                    ['answare' => '1945', 'is_correct' => true],
                    ['answare' => '1939', 'is_correct' => false],
                    ['answare' => '1963', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'Which empire built the Great Wall of China?',
                'answers' => [
                    ['answare' => 'Roman Empire', 'is_correct' => false],
                    ['answare' => 'Mongol Empire', 'is_correct' => false],
                    ['answare' => 'Chinese Empires (various)', 'is_correct' => true],
                    ['answare' => 'Ottoman Empire', 'is_correct' => false],
                ]
            ],
            [
                'question' => 'Who was the first human to travel into space?',
                'answers' => [
                    ['answare' => 'Neil Armstrong', 'is_correct' => false],
                    ['answare' => 'Yuri Gagarin', 'is_correct' => true],
                    ['answare' => 'Buzz Aldrin', 'is_correct' => false],
                    ['answare' => 'John Glenn', 'is_correct' => false],
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
