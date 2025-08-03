<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\StudyProgram
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StudentBiodata> $studentBiodata
 * @property-read int|null $student_biodata_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudyProgram active()
 * @method static \Database\Factories\StudyProgramFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StudyProgram extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the student biodata for the study program.
     */
    public function studentBiodata(): HasMany
    {
        return $this->hasMany(StudentBiodata::class);
    }

    /**
     * Scope a query to only include active study programs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}