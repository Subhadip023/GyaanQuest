<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'code',
        'user_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ─── Relationships ────────────────────────────────────────────────────

    /** The teacher/owner of the room */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /** All members (students + teachers) */
    public function members()
    {
        return $this->belongsToMany(User::class, 'room_members')
            ->withPivot('role')
            ->withTimestamps();
    }

    /** Quizzes assigned to this room */
    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'room_quizzes')
            ->withPivot(['available_from', 'available_until'])
            ->withTimestamps();
    }

    // ─── Helpers ──────────────────────────────────────────────────────────

    /** Generate a unique 6-char room code */
    public static function generateCode(): string
    {
        do {
            $code = strtoupper(Str::random(6));
        } while (static::where('code', $code)->exists());

        return $code;
    }
}
