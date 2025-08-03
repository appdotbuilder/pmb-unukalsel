<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudyProgram>
 */
class StudyProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $programs = [
            ['name' => 'Teknik Informatika', 'code' => 'TI'],
            ['name' => 'Sistem Informasi', 'code' => 'SI'],
            ['name' => 'Manajemen', 'code' => 'MN'],
            ['name' => 'Akuntansi', 'code' => 'AK'],
            ['name' => 'Hukum', 'code' => 'HK'],
            ['name' => 'Pendidikan Agama Islam', 'code' => 'PAI'],
            ['name' => 'Ekonomi Syariah', 'code' => 'ES'],
            ['name' => 'Komunikasi dan Penyiaran Islam', 'code' => 'KPI'],
        ];

        $program = $this->faker->randomElement($programs);

        return [
            'name' => $program['name'],
            'code' => $program['code'],
            'description' => $this->faker->paragraph(),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the study program is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}