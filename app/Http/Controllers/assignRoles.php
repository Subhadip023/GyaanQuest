<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class assignRoles extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $valData = $request->validate([
                'name' => 'required|array|min:1', 
                'name.*' => 'exists:roles,name',
                'userId' => 'required|numeric|exists:users,id',
            ]);
    
            $user = User::find($valData['userId']);
            if (!$user) {
                return redirect()->back()->with('error', 'User not found.');
            }
    
            $isAdmin = $user->hasRole('admin');
            $authUser = auth()->user();
    
            // Only an admin can change another admin's role
            if ($isAdmin && !$authUser->hasRole('admin')) {
                return redirect()->back()->with('error', 'Only an admin can change the role of another admin.');
            }
    
            // Prevent non-admins from assigning the admin role
            if (in_array('admin', $valData['name']) && !$authUser->hasRole('admin')) {
                return redirect()->back()->with('error', 'Cannot add Admin role if you are not an admin.');
            }
    
            $user->syncRoles($valData['name']);    
    
            return redirect()->back()->with('success', 'Roles assigned to '.$user->name);
        
        } catch (\Throwable $th) {
            \Log::error('Role assignment failed: ' . $th->getMessage());
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
    }
    
}
