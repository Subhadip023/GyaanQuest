<?php

namespace App\Repositories;

use App\Repositories\Interfaces\RoleReposetoryInterface;
use Spatie\Permission\Models\Role;

class RoleReposetory implements RoleReposetoryInterface
{
    public function getAll($paginate, $search)
    {
        return Role::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate($paginate)
            ->appends(['search' => $search]);
    }

    public function create(array $data)
    {
        return Role::create(['name' => $data['name']]);
    }

    public function update($id, array $data)
    {
        $role = Role::findOrFail($id);
        $role->update(['name' => $data['name']]);

        return $role;
    }

    public function delete($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
    }
}
