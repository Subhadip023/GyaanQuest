<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $table = 'quizzes';

    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'display',
        'active',
        'access_code',
        'time_limit',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    // ─── Relationships ────────────────────────────────────────────────────

    public function question()
    {
        return $this->hasMany(Question::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'scores')
            ->withPivot('score')
            ->withTimestamps();
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_quizzes')
            ->withPivot(['available_from', 'available_until'])
            ->withTimestamps();
    }

    public function invitations()
    {
        return $this->hasMany(QuizInvitation::class);
    }
}

