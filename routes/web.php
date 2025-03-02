<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use App\Models\User;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
'bgImageUrl' => asset('images/main-bg.jpg'),
'girlImageUrl' => asset('images/main-girl-image.jpg'),
'isAuth' => auth()->check(),
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

Route::get('admin',function () {
   return Inertia('Admin/Index'); 
})->name('admin');

Route::resource('roles',RoleController::class);




require __DIR__.'/auth.php';