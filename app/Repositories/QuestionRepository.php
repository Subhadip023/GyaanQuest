<?php

namespace App\Repositories;

use App\Models\Question;
use App\Repositories\Interfaces\QuestionRepositoryInterface;

class QuestionRepository implements QuestionRepositoryInterface
{
    public function getAll()
    {
        return Question::all();
    }

    public function create(array $data)
    {
        return Question::create($data);
    }

    public function update($id, array $data)
    {
       $question = Question::findOrFail($id);
       $question->update($data);
       return $question;

    }

    public function delete($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

    }
}