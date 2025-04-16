<?php

namespace App\Repositories;

use App\Repositories\Interfaces\ScoreRepositoryInterface;
use App\Models\Score;

class ScoreRepository implements ScoreRepositoryInterface
{
    public function getAll()
    {
        return Score::all(); 
    }

    public function create(array $data)
    {
        return Score::create($data);
    }

    public function update($id, array $data)
    {
        $model = Score::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        return Score::delete($id);
    }
}