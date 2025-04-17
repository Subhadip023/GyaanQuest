<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Repositories\Interfaces\RoleReposetoryInterface;

class RoleController extends Controller
{
    protected $roleRepo;

    public function __construct(RoleReposetoryInterface $roleRepo)
    {
        $this->roleRepo = $roleRepo;
    }

    public function index(Request $request)
    {
        $paginatePage = $request->input('perpage') ?? 5;
        $search = $request->input('search');

        $roles = $this->roleRepo->getAll($paginatePage, $search);
        $permissions = \Spatie\Permission\Models\Permission::pluck('name')->toArray();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        try {
            $this->roleRepo->create($request->validated());
            return Redirect::route('roles.index')->with('success', 'Role created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $valData = $request->validated();
        if ($valData['name'] === 'admin') {
            return redirect()->back()->with('error', "Admin Role can't be edited!");
        }

        try {
            $this->roleRepo->update($role->id, $valData);
            return Redirect::route('roles.index')->with('success', 'Role updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
    }

    public function destroy(Role $role)
    {
        if ($role->name === 'Admin') {
            return redirect()->back()->with('error', 'Cannot delete Admin role.');
        }

        $this->roleRepo->delete($role->id);
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}