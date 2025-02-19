<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Otp extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'otp', 'expires_at'];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    /**
     * Check if OTP is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }
}
