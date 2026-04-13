<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Repositories\Interfaces\AnswerRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswerController extends Controller
{
    protected $answer_repo;

    public function __construct(AnswerRepositoryInterface $answer_repo)
    {
        $this->answer_repo = $answer_repo;
    }
    public function index()
    {
        return Inertia::render('Answers/Index');
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
    public function store(StoreAnswerRequest $request)
    {
        $this->authorize('create', Answer::class);

        try {
            $valData = $request->validated();
            // question_type
            if ($request->question_type === 'mcq' && count($valData['answers']) <= 2) {
                return redirect()->back()->with('error', 'At least two answers are required for MCQ questions.');
            }
            foreach ($valData['answers'] as $answer) {
                $data = [
                    'question_id' => $valData['question_id'],
                    'answare' => $answer['answare'],
                    'is_correct' => $answer['is_correct'] ?? false,
                    'is_long' => $answer['is_long'] ?? false,
                ];

                $this->answer_repo->create($data);
            }

            return redirect()->back()->with('success', 'Answer(s) created successfully');
        } catch (\Throwable $th) {
            logger()->error('Answer creation failed', ['error' => $th]);
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Answer $answer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Answer $answer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        //
    }
}
