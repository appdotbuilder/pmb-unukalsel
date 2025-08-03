<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Student biodata routes
    Route::resource('biodata', App\Http\Controllers\StudentBiodataController::class)
        ->only(['create', 'store', 'show', 'edit', 'update']);
    
    // Admin routes (check role in controller)
    Route::resource('study-programs', App\Http\Controllers\StudyProgramController::class);
    Route::resource('students', App\Http\Controllers\StudentBiodataController::class)
        ->except(['create', 'store'])
        ->parameters(['students' => 'biodata']);
    Route::get('students/export', function(Illuminate\Http\Request $request) {
        return app(App\Http\Controllers\StudentBiodataController::class)->index($request->merge(['export' => true]));
    })->name('students.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
