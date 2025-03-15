<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request->input('perpage'));
        $paginatePage = $request->input('perpage') ?? 10;
        $roles = Role::with('permissions')->latest()->paginate($paginatePage);
        $search = $request->input('search');

        $roles = Role::with('permissions')
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($paginatePage)
            ->appends(['search' => $search]);

        if ($request->input('search') == null) {
            $roles = Role::with('permissions')->latest()->paginate($paginatePage);
        }



        $permissions = Permission::pluck('name')->toArray();
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $valData = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);
        try {

            // Create the role
            $role = Role::create(['name' => $valData['name']]);

            // Assign permissions if provided
            if (!empty($valData['permissions'])) {
                $role->givePermissionTo($valData['permissions']);
            }

            return Redirect::route('roles.index')->with('success', 'Role Created successfuly');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', "Something went wrong. Please try again.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {   
        $valData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        if ($valData['name']=='admin') {
            return redirect()->back()->with('error', "Admin Role Can't be Edited!");
        }

        try {
            // Update role name
            $role->update(['name' => $valData['name']]);
    
            // Sync permissions if provided
            if (isset($valData['permissions'])) {
                $role->syncPermissions($valData['permissions']);
            } else {
                $role->syncPermissions([]); 
            }
    
            return Redirect::route('roles.index')->with('success', 'Role updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', "Something went wrong. Please try again.");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role->name === 'Admin') {
            return redirect()->back()->with('error', 'Cannot delete Admin role.');
        }

        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}
