<?php

namespace App\Repositories;

use App\Models\Quiz;
use App\Repositories\Interfaces\QuizRepositoryInterface;

class QuizRepository implements QuizRepositoryInterface
{
    public function getAll()
    {
        return Quiz::with('question')->latest()->get();
    }

    public function create(array $data)
    {
        return Quiz::create($data);
    }

    public function update($id, array $data)
    {
        $quize = Quiz::findOrFail($id);
        $quize->update($data);
        return $quize;
    }

    public function delete($id)
    {
        $quize = Quiz::findOrFail($id);
        $quize->delete();
    }
}
