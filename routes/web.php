<?php

use App\Http\Controllers\ProfileController;
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




Route::get('/generate-verification-link/{id}', function ($id) {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $link = URL::temporarySignedRoute(
        'verification.verify',
        Carbon::now()->addMinutes(60), // Link expires in 60 minutes
        ['id' => $user->id, 'hash' => sha1($user->getEmailForVerification())]
    );

    return response()->json(['verification_link' => $link]);
});


require __DIR__.'/auth.php';
