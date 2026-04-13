<?php

namespace App\Repositories;

use App\Models\Answer;
use App\Repositories\Interfaces\AnswerRepositoryInterface;

class AnswerRepository implements AnswerRepositoryInterface
{
    public function getAll()
    {
        return Answer::all();
    }

    public function create(array $data)
    {
        return Answer::create($data);
    }

    public function update($id, array $data)
    {
        $ans = Answer::findOrFail($id);
        $ans->update($data); 
    }

    public function delete($id)
    {
        $ans = Answer::findOrFail($id);
        $ans->delete();
    }
}