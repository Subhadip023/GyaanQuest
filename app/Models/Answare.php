<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answare extends Model
{
    /** @use HasFactory<\Database\Factories\AnswareFactory> */
    use HasFactory;

    protected $fillable = ['question_id','answare','is_correct','is_long'];

    public function question(){
       return $this->belongsTo(Question::class);
    }
}
