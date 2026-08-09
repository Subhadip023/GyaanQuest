<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Score;
use App\Models\User;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    /** Global leaderboard across all quizzes */
    public function index()
    {
        $topUsers = Score::selectRaw('user_id, AVG(score) as avg_score, COUNT(*) as quizzes_taken, MAX(score) as best_score')
            ->groupBy('user_id')
            ->orderByDesc('avg_score')
            ->with('user:id,name,avatar')
            ->take(50)
            ->get();

        $quizLeaderboards = Quiz::with([
            'scores' => fn ($q) => $q->orderByDesc('score')->take(10)->with('user:id,name,avatar'),
        ])
            ->where('active', true)
            ->where('display', 'public')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Leaderboard/Index', compact('topUsers', 'quizLeaderboards'));
    }

    /** Per-quiz leaderboard */
    public function quiz(Quiz $quiz)
    {
        $scores = Score::where('quiz_id', $quiz->id)
            ->orderByDesc('score')
            ->with('user:id,name,avatar')
            ->get()
            ->map(fn ($score, $index) => [
                'rank'   => $index + 1,
                'user'   => $score->user,
                'score'  => round($score->score, 1),
                'date'   => $score->created_at->diffForHumans(),
            ]);

        return Inertia::render('Leaderboard/Quiz', compact('quiz', 'scores'));
    }
}
