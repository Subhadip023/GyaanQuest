<?php

namespace App\Repositories;

use App\Models\Quize;
use App\Repositories\Interfaces\QuizeRepositoryInterface;

class QuizeRepository implements QuizeRepositoryInterface
{
    public function getAll()
    {
        return Quize::latest('created_at')->get();
    }

    public function create(array $data)
    {
        return Quize::create($data);
    }

    public function update($id, array $data)
    {
        $quize = Quize::findOrFail($id);
        $quize->update($data);
        return $quize;
    }

    public function delete($id)
    {
        $quize = Quize::findOrFail($id);
        $quize->delete();
    }
}