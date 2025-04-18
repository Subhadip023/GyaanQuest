<?php

namespace App\Http\Controllers;

use App\Models\Answare;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnswareRequest;
use App\Http\Requests\UpdateAnswareRequest;
use Inertia\Inertia;

class AnswareController extends Controller
{
   
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
        //
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
