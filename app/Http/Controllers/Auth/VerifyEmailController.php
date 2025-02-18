<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        try {
            if ($request->user()->hasVerifiedEmail()) {
                return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
            }
    
            if ($request->user()->markEmailAsVerified()) {
                event(new Verified($request->user()));
            }
    
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        } catch (\Exception $e) {
            // Log the error message to the log file
            Log::error('Email verification error: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong, please try again later.'], 500);
        }
    }
}
