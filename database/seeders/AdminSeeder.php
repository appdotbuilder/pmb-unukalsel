<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrator PMB',
            'email' => 'admin@pmb-unukals.ac.id',
            'phone' => '+6281234567890',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create additional sample students with biodata
        User::factory(10)
            ->student()
            ->create()
            ->each(function ($user) {
                \App\Models\StudentBiodata::factory()
                    ->for($user)
                    ->for(\App\Models\StudyProgram::inRandomOrder()->first())
                    ->create();
            });
    }
}