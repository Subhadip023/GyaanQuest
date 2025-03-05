<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {
            // Validate input
            $valData = $request->validate([
                'name' => 'required|string|max:255|unique:permissions,name',
            ]);
    
            // Create the permission
            $permission = Permission::create($valData);
    
            // Assign permission to the 'admin' role
            $adminRole = Role::where('name', 'admin')->first();
            if ($adminRole) {
                $permission->assignRole($adminRole);
            }
    
            // Redirect back with success message
            return redirect()->back()->with('success', "Permission created successfully");
    
        } catch (\Exception $e) {
            // Log error
            // Log::error("Permission creation failed: " . $e->getMessage());
    
            // Redirect back with error message
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
        //
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
