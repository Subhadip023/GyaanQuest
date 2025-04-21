<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id', 'display', 'active'];

    public function question()
    {
        return $this->hasMany(Question::class);
    }
    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'scores')
            ->withPivot('score')
            ->withTimestamps();
    }
}
