<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class QuizInvitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'invited_by',
        'email',
        'user_id',
        'token',
        'status',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    // ─── Relationships ────────────────────────────────────────────────────

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function inviter()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────

    public static function generateToken(): string
    {
        return Str::random(40);
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }
}
