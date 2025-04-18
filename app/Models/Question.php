<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory;
    
    protected $fillable = ["question","type","quizes_id","number","isActive","display",'user_id'];


    public function quiz()
    {
        return $this->belongsTo(Quize::class, 'quizes_id');
    }
    

}
