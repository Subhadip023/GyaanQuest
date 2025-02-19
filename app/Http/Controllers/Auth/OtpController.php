<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class OtpController extends Controller
{
    /**
     * Send OTP to the user's email.
     */
    public function sendOtp(Request $request)
    {
        // Validate email
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }
    
        $user = User::where('email', $request->email)->first();
    
        // Generate a secure OTP
        $otpCode = random_int(100000, 999999);
    
        // Store OTP in the database
        Otp::updateOrCreate(
            ['user_id' => $user->id],
            [
                'otp' => $otpCode,
                
                // bcrypt($otpCode), // Hash OTP for security
                'expires_at' => Carbon::now()->addMinutes(10),
            ]
        );
    
        // Send OTP via email
        Mail::send('emails.otp', ['otp' => $otpCode], function ($message) use ($user) {
            $message->to($user->email)->subject('Your OTP Code');
        });
    
        // return response()->json(['message' => 'OTP sent successfully!']);
        return redirect()->back()->with('success','OTP sent successfully!');
    }
    /**
     * Verify OTP
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|numeric',
        ]);

        $user = User::where('email', $request->email)->first();
        $otpEntry = Otp::where('user_id', $user->id)->where('otp', $request->otp)->first();

        if (!$otpEntry || $otpEntry->isExpired()) {
            return response()->json(['message' => 'Invalid or expired OTP'], 400);
        }

        // Delete OTP after successful verification
        $otpEntry->delete();

        // Mark email as verified
        $user->email_verified_at = Carbon::now();
        $user->save();

        // return response()->json(['message' => 'Email verified successfully!']);
        return redirect('dashboard')->with('success','Email verified successfully!');
    }
}
