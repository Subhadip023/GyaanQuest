<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\Interfaces\QuizRepositoryInterface;

class DashBoardController extends Controller
{

    protected $quize_repo;

    public function __construct(QuizRepositoryInterface $quize_repository)
    {
        $this->quize_repo = $quize_repository;
    }

    public function __invoke(Request $request)

    {
        $allQuizes = $this->quize_repo->getAll();
        return Inertia::render('Dashboard', compact('allQuizes'));
    }
}
