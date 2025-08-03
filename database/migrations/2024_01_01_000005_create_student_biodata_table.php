<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_biodata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->text('full_address')->nullable();
            $table->string('origin_school')->nullable();
            $table->foreignId('study_program_id')->nullable()->constrained()->onDelete('set null');
            $table->string('ktp_document')->nullable();
            $table->string('diploma_document')->nullable();
            $table->boolean('is_complete')->default(false);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('study_program_id');
            $table->index('is_complete');
            $table->index(['study_program_id', 'is_complete']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_biodata');
    }
};