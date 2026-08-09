<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\assignRoles;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizInvitationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;

// ─── Public Pages ─────────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'    => PHP_VERSION,
        'bgImageUrl'    => asset('images/main-bg.jpg'),
        'girlImageUrl'  => asset('images/main-girl-image.jpg'),
        'isAuth'        => auth()->check(),
        'isAdmin'       => auth()->user()?->hasRole('admin'),
    ]);
});

// ─── Authenticated Routes ─────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', DashBoardController::class)->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Quizzes
    Route::resource('quizzes', QuizController::class);
    Route::post('/quizzes/{quiz}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');

    // Questions & Answers
    Route::resource('questions', QuestionController::class);
    Route::resource('answers', AnswerController::class);

    // Rooms (Classrooms)
    Route::resource('rooms', RoomController::class);
    Route::post('/rooms/join', [RoomController::class, 'join'])->name('rooms.join');
    Route::delete('/rooms/{room}/leave', [RoomController::class, 'leave'])->name('rooms.leave');
    Route::delete('/rooms/{room}/members', [RoomController::class, 'removeMember'])->name('rooms.members.remove');
    Route::post('/rooms/{room}/quizzes', [RoomController::class, 'assignQuiz'])->name('rooms.quizzes.assign');

    // Quiz Invitations
    Route::post('/quizzes/{quiz}/invite', [QuizInvitationController::class, 'invite'])->name('quizzes.invite');
    Route::get('/invitations', [QuizInvitationController::class, 'myInvitations'])->name('invitations.index');
    Route::post('/quiz/access-code', [QuizInvitationController::class, 'accessByCode'])->name('quizzes.access-code');

    // Leaderboard
    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard.index');
    Route::get('/leaderboard/quiz/{quiz}', [LeaderboardController::class, 'quiz'])->name('leaderboard.quiz');

    // Admin
    Route::get('admin', function () {
        return Inertia::render('Admin/Index');
    })->name('admin')->middleware('role:admin');

    // Roles / Permissions / Users (Admin only)
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    Route::post('/assignRole', assignRoles::class)->name('assign-role');
});

// ─── Public Invitation Accept (may be accessed from email link) ───────────────
Route::get('/invitations/accept/{token}', [QuizInvitationController::class, 'accept'])
    ->middleware('auth')
    ->name('invitations.accept');

// ─── Debug ────────────────────────────────────────────────────────────────────
Route::get('view-logs', function () {
    $logs = file_get_contents(storage_path('logs/laravel.log'));
    return response($logs, 200)->header('Content-Type', 'text/plain');
})->middleware('auth');

require __DIR__ . '/auth.php';

