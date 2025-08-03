<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\StudentBiodata;
use App\Models\StudyProgram;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            $totalApplicants = User::students()->count();
            $completeBiodata = StudentBiodata::complete()->count();
            $incompleteBiodata = StudentBiodata::incomplete()->count();
            
            $studyProgramStats = StudyProgram::withCount('studentBiodata')
                ->active()
                ->get()
                ->map(function ($program) {
                    return [
                        'name' => $program->name,
                        'code' => $program->code,
                        'total_applicants' => $program->student_biodata_count,
                    ];
                });

            $recentApplicants = StudentBiodata::with(['user', 'studyProgram'])
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'total_applicants' => $totalApplicants,
                    'complete_biodata' => $completeBiodata,
                    'incomplete_biodata' => $incompleteBiodata,
                ],
                'study_program_stats' => $studyProgramStats,
                'recent_applicants' => $recentApplicants,
            ]);
        }

        $biodata = $user->biodata()->with('studyProgram')->first();
        $studyPrograms = StudyProgram::active()->get();

        return Inertia::render('students/dashboard', [
            'biodata' => $biodata,
            'study_programs' => $studyPrograms,
        ]);
    }
}