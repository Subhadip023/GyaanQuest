<?php

namespace App\Http\Controllers;

use App\Models\Quize;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizeRequest;
use App\Http\Requests\UpdateQuizeRequest;
use App\Repositories\Interfaces\QuizeRepositoryInterface;
use Inertia\Inertia;
use PHPUnit\Framework\MockObject\Stub\ReturnStub;

class QuizeController extends Controller
{
    protected $quize_repo;

    public function __construct(QuizeRepositoryInterface $quize_repository) {
        $this->quize_repo = $quize_repository;
    }


    public function index()
    {   
        $quizes=$this->quize_repo->getAll();
        return Inertia::render('Quizee/Index',['quizes'=>$quizes]);
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
    public function store(StoreQuizeRequest $request)
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
    public function show(Quize $quize)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quize $quize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizeRequest $request, Quize $quize)
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
    public function destroy(Quize $quize)
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
