<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Repositories\Interfaces\QuizRepositoryInterface;
use App\Repositories\Interfaces\ScoreRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Answare;


class QuizController extends Controller
{
    protected $quiz_repo;
    protected $score_repo;

    public function __construct(QuizRepositoryInterface $quiz_repository, ScoreRepositoryInterface $score_repository)
    {
        $this->quiz_repo = $quiz_repository;
        $this->score_repo = $score_repository;
    }


    public function index()
    {
        $quizzes = $this->quiz_repo->getAll();
        return Inertia::render('Quizzes/Index', ['quizzes' => $quizzes]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        try {
            $valData = $request->validated();
            $valData['user_id'] = auth()->id();
            $this->quiz_repo->create($valData);

            return redirect()->back()->with('success', 'Quiz created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create quiz. ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $quiz = $this->quiz_repo->get($id, ['question.answers']);
        return Inertia::render('Quizzes/Play', ['quiz' => $quiz]);
    }

    /**
     * Submit the quiz and calculate score.
     */
    public function submit(Request $request, Quiz $quiz)
    {
        $userAnswers = $request->input('answers'); // Format: [question_id => answer_id]
        $questions = $quiz->question()->with('answers')->get();
        
        $correctCount = 0;
        $totalQuestions = $questions->count();

        foreach ($questions as $question) {
            $submittedAnswerId = $userAnswers[$question->id] ?? null;
            $correctAnswer = $question->answers->where('is_correct', true)->first();

            if ($submittedAnswerId && $correctAnswer && $submittedAnswerId == $correctAnswer->id) {
                $correctCount++;
            }
        }

        $scorePercentage = $totalQuestions > 0 ? ($correctCount / $totalQuestions) * 100 : 0;

        $scoreData = [
            'quiz_id' => $quiz->id,
            'user_id' => auth()->id(),
            'score' => $scorePercentage,
        ];

        $this->score_repo->create($scoreData);

        return redirect()->back()->with([
            'success' => 'Quiz submitted successfully!',
            'score' => $scorePercentage,
            'correctCount' => $correctCount,
            'totalCount' => $totalQuestions,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        try {
            $this->authorize('update', $quiz);

            $valData = $request->validated();
            $this->quiz_repo->update($quiz->id, $valData);

            return redirect()->back()->with('success', 'Quiz updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update quiz. ' . $e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        try {
            $this->authorize('delete', $quiz);

            $this->quiz_repo->delete($quiz->id);

            return redirect()->back()->with('success', 'Quiz deleted successfully!');
        } catch (\Exception $e) {
            // return redirect()->back()->with('error', 'Failed to delete quiz. ' . $e->getMessage());
            log::error('Failed to delete quiz: ' . $e->getsMessage());
            
            return redirect()->back()->with('error', 'Failed to delete quiz.');
        }
    }
}
