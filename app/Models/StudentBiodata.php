<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentBiodata
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $place_of_birth
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string|null $gender
 * @property string|null $full_address
 * @property string|null $origin_school
 * @property int|null $study_program_id
 * @property string|null $ktp_document
 * @property string|null $diploma_document
 * @property bool $is_complete
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\StudyProgram|null $studyProgram
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereDiplomaDocument($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereFullAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereIsComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereKtpDocument($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereOriginSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata wherePlaceOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereStudyProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata complete()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentBiodata incomplete()
 * @method static \Database\Factories\StudentBiodataFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StudentBiodata extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'student_biodata';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'full_address',
        'origin_school',
        'study_program_id',
        'ktp_document',
        'diploma_document',
        'is_complete',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'is_complete' => 'boolean',
    ];

    /**
     * Get the user that owns the biodata.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the study program associated with the biodata.
     */
    public function studyProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class);
    }

    /**
     * Scope a query to only include complete biodata.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeComplete($query)
    {
        return $query->where('is_complete', true);
    }

    /**
     * Scope a query to only include incomplete biodata.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncomplete($query)
    {
        return $query->where('is_complete', false);
    }

    /**
     * Check if all required fields are filled.
     *
     * @return bool
     */
    public function checkCompleteness(): bool
    {
        $requiredFields = [
            'place_of_birth',
            'date_of_birth',
            'gender',
            'full_address',
            'origin_school',
            'study_program_id',
            'ktp_document',
            'diploma_document',
        ];

        foreach ($requiredFields as $field) {
            if (empty($this->$field)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Update the completion status based on filled fields.
     *
     * @return void
     */
    public function updateCompletionStatus(): void
    {
        $this->is_complete = $this->checkCompleteness();
        $this->save();
    }
}