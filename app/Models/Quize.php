<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quize extends Model
{
    /** @use HasFactory<\Database\Factories\QuizeFactory> */
    use HasFactory;

    protected $fillable =['name','description','user_id','display'];

    public function question(){
        $this->hasMany(Question::class);
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
