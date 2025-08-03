<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentBiodataRequest;
use App\Http\Requests\UpdateStudentBiodataRequest;
use App\Models\StudentBiodata;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentBiodataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Check if this is an export request
        if ($request->has('export')) {
            return $this->handleExport($request);
        }

        $query = StudentBiodata::with(['user', 'studyProgram']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by study program
        if ($request->filled('study_program')) {
            $query->where('study_program_id', $request->study_program);
        }

        // Filter by completion status
        if ($request->filled('status')) {
            $isComplete = $request->status === 'complete';
            $query->where('is_complete', $isComplete);
        }

        $biodataList = $query->latest()->paginate(10)->withQueryString();
        $studyPrograms = StudyProgram::active()->get();

        return Inertia::render('admin/students/index', [
            'biodataList' => $biodataList,
            'studyPrograms' => $studyPrograms,
            'filters' => $request->only(['search', 'study_program', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $studyPrograms = StudyProgram::active()->get();
        
        return Inertia::render('students/biodata/create', [
            'studyPrograms' => $studyPrograms
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentBiodataRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Handle file uploads
        if ($request->hasFile('ktp_document')) {
            $data['ktp_document'] = $request->file('ktp_document')->store('documents/ktp', 'public');
        }

        if ($request->hasFile('diploma_document')) {
            $data['diploma_document'] = $request->file('diploma_document')->store('documents/diploma', 'public');
        }

        $biodata = StudentBiodata::create($data);
        $biodata->updateCompletionStatus();

        return redirect()->route('dashboard')
            ->with('success', 'Biodata berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentBiodata $biodata)
    {
        $biodata->load(['user', 'studyProgram']);
        
        return Inertia::render('students/biodata/show', [
            'biodata' => $biodata
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentBiodata $biodata)
    {
        $biodata->load(['user', 'studyProgram']);
        $studyPrograms = StudyProgram::active()->get();
        
        return Inertia::render('students/biodata/edit', [
            'biodata' => $biodata,
            'studyPrograms' => $studyPrograms
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentBiodataRequest $request, StudentBiodata $biodata)
    {
        $data = $request->validated();

        // Handle file uploads
        if ($request->hasFile('ktp_document')) {
            // Delete old file
            if ($biodata->ktp_document) {
                Storage::disk('public')->delete($biodata->ktp_document);
            }
            $data['ktp_document'] = $request->file('ktp_document')->store('documents/ktp', 'public');
        }

        if ($request->hasFile('diploma_document')) {
            // Delete old file
            if ($biodata->diploma_document) {
                Storage::disk('public')->delete($biodata->diploma_document);
            }
            $data['diploma_document'] = $request->file('diploma_document')->store('documents/diploma', 'public');
        }

        $biodata->update($data);
        $biodata->updateCompletionStatus();

        $redirectRoute = auth()->user()->isAdmin() ? 'students.show' : 'dashboard';
        $redirectParams = auth()->user()->isAdmin() ? ['student' => $biodata] : [];

        return redirect()->route($redirectRoute, $redirectParams)
            ->with('success', 'Biodata berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentBiodata $biodata)
    {
        // Delete uploaded files
        if ($biodata->ktp_document) {
            Storage::disk('public')->delete($biodata->ktp_document);
        }
        if ($biodata->diploma_document) {
            Storage::disk('public')->delete($biodata->diploma_document);
        }

        $biodata->delete();

        return redirect()->route('students.index')
            ->with('success', 'Biodata berhasil dihapus.');
    }

    /**
     * Handle CSV export functionality.
     */
    protected function handleExport(Request $request)
    {
        $query = StudentBiodata::with(['user', 'studyProgram']);

        // Apply same filters as index
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('study_program')) {
            $query->where('study_program_id', $request->study_program);
        }

        if ($request->filled('status')) {
            $isComplete = $request->status === 'complete';
            $query->where('is_complete', $isComplete);
        }

        $biodataList = $query->get();

        $filename = 'data-mahasiswa-' . now()->format('Y-m-d-H-i-s') . '.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename={$filename}",
        ];

        $callback = function () use ($biodataList) {
            $file = fopen('php://output', 'w');
            
            // CSV headers
            fputcsv($file, [
                'Nama',
                'Email',
                'Telepon',
                'Tempat Lahir',
                'Tanggal Lahir',
                'Jenis Kelamin',
                'Alamat',
                'Asal Sekolah',
                'Program Studi',
                'Status Biodata',
                'Tanggal Daftar',
            ]);

            // CSV data
            foreach ($biodataList as $biodata) {
                fputcsv($file, [
                    $biodata->user->name,
                    $biodata->user->email,
                    $biodata->user->phone ?? '-',
                    $biodata->place_of_birth ?? '-',
                    $biodata->date_of_birth?->format('d/m/Y') ?? '-',
                    $biodata->gender === 'male' ? 'Laki-laki' : ($biodata->gender === 'female' ? 'Perempuan' : '-'),
                    $biodata->full_address ?? '-',
                    $biodata->origin_school ?? '-',
                    $biodata->studyProgram->name ?? '-',
                    $biodata->is_complete ? 'Lengkap' : 'Belum Lengkap',
                    $biodata->created_at?->format('d/m/Y H:i') ?? '-',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}