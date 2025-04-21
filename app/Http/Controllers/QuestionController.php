<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Repositories\Interfaces\QuestionRepositoryInterface;
use App\Repositories\Interfaces\QuizRepositoryInterface;
use Inertia\Inertia;

class QuestionController extends Controller
{
    protected $question_repo;
    protected $quize_repo;
    public function __construct(QuestionRepositoryInterface $question_repository, QuizRepositoryInterface $quize_repository)
    {
        $this->question_repo = $question_repository;
        $this->quize_repo = $quize_repository;
    }

    public function index()
    {
        $this->authorize('viewAny', Question::class);
        $questions = $this->question_repo->getAll();
        $quizzes = $this->quize_repo->getAll();
        // return $questions;
        return Inertia::render('Questions/Index', compact('questions', 'quizzes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request)
    {
        $this->authorize('create', Question::class);
        try {
            $valData = $request->validated();
            $valData['user_id'] = auth()->id();
            $this->question_repo->create($valData);
            return redirect()->back()->with('success', 'Question created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $this->authorize('update', $question);

        try {
            $valData = $request->validated();
            $this->question_repo->update($question->id, $valData);
            return redirect()->back()->with('success', 'Question updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $this->authorize('delete', $question);
        try {
            $this->question_repo->delete($question->id);
            return redirect()->back()->with('success', 'Question deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
