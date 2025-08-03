<?php

namespace Database\Seeders;

use App\Models\StudyProgram;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name' => 'Teknik Informatika', 'code' => 'TI', 'description' => 'Program studi yang mempelajari teknologi informasi dan komputer'],
            ['name' => 'Sistem Informasi', 'code' => 'SI', 'description' => 'Program studi yang mempelajari sistem informasi dan manajemen data'],
            ['name' => 'Manajemen', 'code' => 'MN', 'description' => 'Program studi yang mempelajari ilmu manajemen dan bisnis'],
            ['name' => 'Akuntansi', 'code' => 'AK', 'description' => 'Program studi yang mempelajari ilmu akuntansi dan keuangan'],
            ['name' => 'Hukum', 'code' => 'HK', 'description' => 'Program studi yang mempelajari ilmu hukum dan perundang-undangan'],
            ['name' => 'Pendidikan Agama Islam', 'code' => 'PAI', 'description' => 'Program studi yang mempelajari pendidikan dan agama Islam'],
            ['name' => 'Ekonomi Syariah', 'code' => 'ES', 'description' => 'Program studi yang mempelajari ekonomi berdasarkan prinsip syariah'],
            ['name' => 'Komunikasi dan Penyiaran Islam', 'code' => 'KPI', 'description' => 'Program studi yang mempelajari komunikasi dan dakwah Islam'],
        ];

        foreach ($programs as $program) {
            StudyProgram::create([
                'name' => $program['name'],
                'code' => $program['code'],
                'description' => $program['description'],
                'is_active' => true,
            ]);
        }
    }
}