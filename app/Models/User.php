<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'bio',
        'institution',
        'skills',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'skills'            => 'array',
        ];
    }

    // ─── Relationships ────────────────────────────────────────────────────

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'scores')
            ->withPivot('score')
            ->withTimestamps();
    }

    /** Rooms this user owns (teacher) */
    public function ownedRooms()
    {
        return $this->hasMany(Room::class);
    }

    /** Rooms this user belongs to as a member */
    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_members')
            ->withPivot('role')
            ->withTimestamps();
    }

    /** Quiz invitations received */
    public function quizInvitations()
    {
        return $this->hasMany(QuizInvitation::class);
    }
}

