<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Repositories\Interfaces\QuizRepositoryInterface;
use Inertia\Inertia;
use PHPUnit\Framework\MockObject\Stub\ReturnStub;

class QuizController extends Controller
{
    protected $quize_repo;

    public function __construct(QuizRepositoryInterface $quize_repository)
    {
        $this->quize_repo = $quize_repository;
    }


    public function index()
    {
        $quizzes = $this->quize_repo->getAll();
        return Inertia::render('Quizee/Index', ['quizzes' => $quizzes]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        try {
            $valData = $request->validated();
            $valData['user_id'] = auth()->id();
            $this->quize_repo->create($valData);

            return redirect()->back()->with('success', 'Quiz created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create quiz. ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Quiz $quize)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quize)
    {
        try {
            $this->authorize('update', $quize);

            $valData = $request->validated();
            $this->quize_repo->update($quize->id, $valData);

            return redirect()->back()->with('success', 'Quiz updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update quiz. ' . $e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quize)
    {
        try {
            $this->authorize('delete', $quize);

            $this->quize_repo->delete($quize->id);

            return redirect()->back()->with('success', 'Quiz deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete quiz. ' . $e->getMessage());
        }
    }
}
