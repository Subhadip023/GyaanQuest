<?php

namespace App\Repositories\Interfaces;

interface QuestionRepositoryInterface
{
    public function getAll();
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}