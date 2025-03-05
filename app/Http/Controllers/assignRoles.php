<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class assignRoles extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $valData = $request->validate([
                'name' => 'array|min:1',
                'name.*' => 'exists:roles,name',
                'userId' => 'required|numeric|exists:users,id', // Fixed validation
            ]);

            if(in_array('admin',$valData['name'])&&!auth()->user()->hasRoles('admin')){
                return redirect()->back()->with('error', 'Can not add Admin role If you are not a admin');
            }

            $user = User::find($valData['userId']); 


            if (!$user) {
                return redirect()->back()->with('error', 'User not found.');
            }

            $user->syncRoles($valData['name']);    

            return redirect()->back()->with('success', 'Roles assigned to user.');
        
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }
       

    }
}
