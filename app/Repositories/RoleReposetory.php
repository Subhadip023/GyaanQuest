<?php

namespace App\Repositories;

use App\Repositories\Interfaces\RoleReposetoryInterface;
use Spatie\Permission\Models\Role;

class RoleReposetory implements RoleReposetoryInterface
{
    public function getAll($paginate, $search)
    {
        return Role::with('permissions')
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate($paginate)
            ->appends(['search' => $search]);
    }

    public function create(array $data)
    {
        $role = Role::create(['name' => $data['name']]);

        if (!empty($data['permissions'])) {
            $role->givePermissionTo($data['permissions']);
        }

        return $role;
    }

    public function update($id, array $data)
    {
        $role = Role::findOrFail($id);
        $role->update(['name' => $data['name']]);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        } else {
            $role->syncPermissions([]);
        }

        return $role;
    }

    public function delete($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
    }
}
