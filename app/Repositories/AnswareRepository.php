<?php

namespace App\Repositories;

use App\Models\Answare;
use App\Repositories\Interfaces\AnswareRepositoryInterface;

class AnswareRepository implements AnswareRepositoryInterface
{
    public function getAll()
    {
        return Answare::all();
    }

    public function create(array $data)
    {
        return Answare::create($data);
    }

    public function update($id, array $data)
    {
        $ans = Answare::findOrFail($id);
        $ans->update($data); 
    }

    public function delete($id)
    {
        $ans = Answare::findOrFail($id);
        $ans->delete();
    }
}