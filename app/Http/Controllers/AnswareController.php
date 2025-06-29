<?php

namespace App\Http\Controllers;

use App\Models\Answare;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnswareRequest;
use App\Http\Requests\UpdateAnswareRequest;
use App\Repositories\Interfaces\AnswareRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswareController extends Controller
{
    protected $answare_repo;

    public function __construct(AnswareRepositoryInterface $answare_repo)
    {
        $this->answare_repo = $answare_repo;
    }
    public function index()
    {
        return Inertia::render('Answare/Index');
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
    public function store(StoreAnswareRequest $request)
{
    $this->authorize('create', Answare::class);

    try {
        $valData = $request->validated();
        // question_type
        if ($request->question_type === 'mcq'&&count ($valData['answers'])<=2) {
            return redirect()->back()->with('error', 'At least two answers are required for MCQ questions.');
        }
        foreach ($valData['answers'] as $answer) {
            $data = [
                'question_id' => $valData['question_id'],
                'answare' => $answer['answare'],
                'is_correct' => $answer['is_correct'] ?? false,
                'is_long' => $answer['is_long'] ?? false,
            ];

            $this->answare_repo->create($data);
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
    public function show(Answare $answare)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Answare $answare)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswareRequest $request, Answare $answare)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answare $answare)
    {
        //
    }
}
