<?php
namespace App\Repositories\Interfaces;

interface RoleReposetoryInterface {
    public function getAll($paginate, $search);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
