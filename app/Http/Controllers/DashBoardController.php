<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Interfaces\QuizRepositoryInterface;

class DashBoardController extends Controller
{

    protected $quiz_repo;

    public function __construct(QuizRepositoryInterface $quiz_repository)
    {
        $this->quiz_repo = $quiz_repository;
    }

    public function __invoke(Request $request)
    {
        $allQuizzes = $this->quiz_repo->getAll();
        $recentScores = auth()->user()->scores()->with('quiz')->latest()->take(5)->get();
        
        return Inertia::render('Dashboard', [
            'allQuizzes' => $allQuizzes,
            'recentScores' => $recentScores,
        ]);
    }
}
