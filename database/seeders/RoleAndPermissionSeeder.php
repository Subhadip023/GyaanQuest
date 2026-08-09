<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ─── 1. Define & Create Permissions ──────────────────────────────────
        $permissions = [
            // Admin & User Management
            'view admin dashboard',
            'manage users',
            'manage roles',
            'manage permissions',

            // Quiz Management
            'create quizzes',
            'edit quizzes',
            'delete quizzes',
            'publish quizzes',

            // Room Management
            'create rooms',
            'edit rooms',
            'delete rooms',
            'assign room quizzes',

            // Student Capabilities
            'take quizzes',
            'join rooms',
            'view leaderboard',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
        }

        // ─── 2. Create Roles & Assign Permissions ────────────────────────────

        // Admin Role (Gets all permissions)
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(Permission::all());

        // Teacher Role (Can manage quizzes, questions, rooms, and play quizzes)
        $teacherRole = Role::firstOrCreate(['name' => 'teacher', 'guard_name' => 'web']);
        $teacherRole->syncPermissions([
            'create quizzes',
            'edit quizzes',
            'delete quizzes',
            'publish quizzes',
            'create rooms',
            'edit rooms',
            'delete rooms',
            'assign room quizzes',
            'take quizzes',
            'join rooms',
            'view leaderboard',
        ]);

        // Student Role (Can join rooms, play quizzes, view leaderboard)
        $studentRole = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);
        $studentRole->syncPermissions([
            'take quizzes',
            'join rooms',
            'view leaderboard',
        ]);

        // ─── 3. Seed Default Admin User ──────────────────────────────────────
        $adminEmail = 'admin@gyaanquest.com';
        $adminUser = User::where('email', $adminEmail)->first();

        if (!$adminUser) {
            $adminUser = User::create([
                'name'              => 'System Admin',
                'email'             => $adminEmail,
                'password'          => Hash::make('password123'),
                'email_verified_at' => now(),
                'institution'       => 'GyaanQuest HQ',
                'bio'               => 'System Administrator',
            ]);
        }

        if (!$adminUser->hasRole('admin')) {
            $adminUser->assignRole($adminRole);
        }

        // ─── 4. Assign Default Role to existing users without roles ──────────
        $usersWithoutRoles = User::doesntHave('roles')->get();
        foreach ($usersWithoutRoles as $user) {
            $user->assignRole($studentRole);
        }

        $this->command->info('Roles and permissions seeded successfully!');
    }
}
