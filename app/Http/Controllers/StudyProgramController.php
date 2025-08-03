<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudyProgramRequest;
use App\Http\Requests\UpdateStudyProgramRequest;
use App\Models\StudyProgram;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studyPrograms = StudyProgram::withCount('studentBiodata')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/study-programs/index', [
            'studyPrograms' => $studyPrograms
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/study-programs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudyProgramRequest $request)
    {
        $studyProgram = StudyProgram::create($request->validated());

        return redirect()->route('study-programs.index')
            ->with('success', 'Program studi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(StudyProgram $studyProgram)
    {
        $studyProgram->load(['studentBiodata.user']);
        
        return Inertia::render('admin/study-programs/show', [
            'studyProgram' => $studyProgram
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudyProgram $studyProgram)
    {
        return Inertia::render('admin/study-programs/edit', [
            'studyProgram' => $studyProgram
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudyProgramRequest $request, StudyProgram $studyProgram)
    {
        $studyProgram->update($request->validated());

        return redirect()->route('study-programs.index')
            ->with('success', 'Program studi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudyProgram $studyProgram)
    {
        $studyProgram->delete();

        return redirect()->route('study-programs.index')
            ->with('success', 'Program studi berhasil dihapus.');
    }
}