<?php

namespace Database\Factories;

use App\Models\StudyProgram;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentBiodata>
 */
class StudentBiodataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isComplete = $this->faker->boolean(70); // 70% chance of complete biodata

        return [
            'user_id' => User::factory(),
            'place_of_birth' => $isComplete ? $this->faker->city() : null,
            'date_of_birth' => $isComplete ? $this->faker->dateTimeBetween('-25 years', '-17 years') : null,
            'gender' => $isComplete ? $this->faker->randomElement(['male', 'female']) : null,
            'full_address' => $isComplete ? $this->faker->address() : null,
            'origin_school' => $isComplete ? 'SMA ' . $this->faker->company() : null,
            'study_program_id' => $isComplete ? StudyProgram::factory() : null,
            'ktp_document' => $isComplete ? 'documents/ktp/sample-ktp.pdf' : null,
            'diploma_document' => $isComplete ? 'documents/diploma/sample-diploma.pdf' : null,
            'is_complete' => $isComplete,
        ];
    }

    /**
     * Indicate that the biodata is complete.
     */
    public function complete(): static
    {
        return $this->state(fn (array $attributes) => [
            'place_of_birth' => $this->faker->city(),
            'date_of_birth' => $this->faker->dateTimeBetween('-25 years', '-17 years'),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'full_address' => $this->faker->address(),
            'origin_school' => 'SMA ' . $this->faker->company(),
            'study_program_id' => StudyProgram::factory(),
            'ktp_document' => 'documents/ktp/sample-ktp.pdf',
            'diploma_document' => 'documents/diploma/sample-diploma.pdf',
            'is_complete' => true,
        ]);
    }

    /**
     * Indicate that the biodata is incomplete.
     */
    public function incomplete(): static
    {
        return $this->state(fn (array $attributes) => [
            'place_of_birth' => null,
            'date_of_birth' => null,
            'gender' => null,
            'full_address' => null,
            'origin_school' => null,
            'study_program_id' => null,
            'ktp_document' => null,
            'diploma_document' => null,
            'is_complete' => false,
        ]);
    }
}