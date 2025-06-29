<?php

namespace App\Repositories\Interfaces;

interface QuizRepositoryInterface
{
    public function getAll();
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
