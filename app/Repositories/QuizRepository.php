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
        $quiz = Quiz::findOrFail($id);
        $quiz->update($data);
        return $quiz;
    }

    public function delete($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();
    }
    public function get($id, array $relations = [])
    {
        return Quiz::with($relations)->findOrFail($id);
    }
}
