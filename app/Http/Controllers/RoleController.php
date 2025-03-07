<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;



class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
        $roles = Role::with('permissions')->latest()->get();
        $permissions = Permission::pluck('name')->toArray();
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions'=>$permissions,
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
    { $valData = $request->validate([
        'name' => 'required|string|max:255|unique:roles,name',
        'permissions' => 'nullable|array', 
        'permissions.*' => 'exists:permissions,name', 
    ]);
        try {
            // Validate input
           
    
            // Create the role
            $role = Role::create(['name' => $valData['name']]);
    
            // Assign permissions if provided
            if (!empty($valData['permissions'])) {
                $role->givePermissionTo($valData['permissions']);
            }
    
            return redirect('/roles');
    
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
    public function edit(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    
}
