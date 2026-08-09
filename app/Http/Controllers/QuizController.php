<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Repositories\Interfaces\QuizRepositoryInterface;
use App\Repositories\Interfaces\ScoreRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


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
     * Submit the quiz and calculate score (supports all question types).
     */
    public function submit(Request $request, Quiz $quiz)
    {
        // answers format: [question_id => answer_id] for MCQ/TF
        // or [question_id => [answer_id, ...]] for multiple_correct
        // or [question_id => "text"] for saq/fill_blank
        $userAnswers  = $request->input('answers', []);
        $questions    = $quiz->question()->with('answers')->get();
        $totalQuestions = $questions->count();
        $correctCount   = 0;

        foreach ($questions as $question) {
            $submitted = $userAnswers[$question->id] ?? null;

            switch ($question->type) {
                // ── Single-choice MCQ / True-False ────────────────────────
                case 'mcq':
                case 'true_false':
                    $correctAnswer = $question->answers->where('is_correct', true)->first();
                    if ($submitted && $correctAnswer && $submitted == $correctAnswer->id) {
                        $correctCount++;
                    }
                    break;

                // ── Multiple Correct ──────────────────────────────────────
                case 'multiple_correct':
                    if (is_array($submitted)) {
                        $correctIds   = $question->answers->where('is_correct', true)->pluck('id')->sort()->values()->toArray();
                        $submittedIds = collect($submitted)->map(fn ($v) => (int) $v)->sort()->values()->toArray();
                        if ($correctIds === $submittedIds) {
                            $correctCount++;
                        }
                    }
                    break;

                // ── Short Answer / Fill in the Blank (case-insensitive) ───
                case 'saq':
                case 'fill_blank':
                    $correctAnswer = $question->answers->where('is_correct', true)->first();
                    if ($submitted && $correctAnswer) {
                        $normalize = fn ($s) => strtolower(trim($s));
                        if ($normalize($submitted) === $normalize($correctAnswer->answare)) {
                            $correctCount++;
                        }
                    }
                    break;

                // ── Long Answer (manually graded, no auto-score) ──────────
                case 'long':
                default:
                    break;
            }
        }

        $scorePercentage = $totalQuestions > 0
            ? round(($correctCount / $totalQuestions) * 100, 2)
            : 0;

        $this->score_repo->create([
            'quiz_id' => $quiz->id,
            'user_id' => auth()->id(),
            'score'   => $scorePercentage,
        ]);

        return redirect()->back()->with([
            'success'      => 'Quiz submitted successfully!',
            'score'        => $scorePercentage,
            'correctCount' => $correctCount,
            'totalCount'   => $totalQuestions,
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
            Log::error('Failed to delete quiz: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete quiz.');
        }
    }
}
