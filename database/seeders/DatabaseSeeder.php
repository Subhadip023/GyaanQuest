<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;

use function Laravel\Prompts\password;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt(12345678),
            'email_verified_at' => now(),
        ]);

        // Create Role
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        // Define Permissions
        $permissions = [
            'abc',
            'create users',
            'edit users',
            'view users',
            'view admin dashboard',
            'test',
        ];

        // Create and Assign Permissions
        foreach ($permissions as $p) {
            $permission = Permission::firstOrCreate(['name' => $p, 'guard_name' => 'web']);
            $role->givePermissionTo($permission);
        }

        // Assign Role to Admin User
        $user->assignRole('admin');
    }
    
}
