<?php

use App\Http\Controllers\assignRoles;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArtisanCommandController;
use App\Http\Controllers\QuizeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'bgImageUrl' => asset('images/main-bg.jpg'),
        'girlImageUrl' => asset('images/main-girl-image.jpg'),
        'isAuth' => auth()->check(),
        'isAdmin'=>auth()->user()?->hasRole('admin'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('view-logs', function () {
    $logs = file_get_contents(storage_path('logs/laravel.log'));
    return response($logs, 200)
        ->header('Content-Type', 'text/plain');
});

Route::get('admin', function () {
    return Inertia::render('Admin/Index');
})->name('admin')->middleware(['auth', 'permission:view admin dashboard']);


Route::resource('roles', RoleController::class);
Route::resource('permissions', PermissionController::class);
Route::resource('users',UserController::class);

Route::post('/assignRole',assignRoles::class)->name('assign-role');
Route::resource('quizes',QuizeController::class);

require __DIR__ . '/auth.php';
