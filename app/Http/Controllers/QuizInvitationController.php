<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class QuizInvitationController extends Controller
{
    /** Send email invitations for a private quiz */
    public function invite(Request $request, Quiz $quiz)
    {
        $this->authorize('update', $quiz);

        $request->validate([
            'emails'   => 'required|array|min:1',
            'emails.*' => 'required|email',
        ]);

        foreach ($request->emails as $email) {
            // Avoid duplicate pending invitations
            $existing = QuizInvitation::where('quiz_id', $quiz->id)
                ->where('email', $email)
                ->where('status', 'pending')
                ->first();

            if ($existing) {
                continue;
            }

            QuizInvitation::create([
                'quiz_id'    => $quiz->id,
                'invited_by' => Auth::id(),
                'email'      => $email,
                'token'      => QuizInvitation::generateToken(),
                'status'     => 'pending',
                'expires_at' => now()->addDays(7),
            ]);

            // TODO: dispatch a mail job here
            // Mail::to($email)->queue(new QuizInvitationMail($quiz, $token));
        }

        return redirect()->back()->with('success', 'Invitations sent successfully!');
    }

    /** Accept an invitation via token link */
    public function accept(string $token)
    {
        $invitation = QuizInvitation::where('token', $token)
            ->where('status', 'pending')
            ->firstOrFail();

        if ($invitation->isExpired()) {
            return redirect()->route('dashboard')
                ->with('error', 'This invitation has expired.');
        }

        $invitation->update([
            'status'  => 'accepted',
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('quizzes.show', $invitation->quiz_id)
            ->with('success', 'Invitation accepted! You can now take the quiz.');
    }

    /** Access a private quiz via access code */
    public function accessByCode(Request $request)
    {
        $request->validate(['access_code' => 'required|string']);

        $quiz = Quiz::where('access_code', $request->access_code)
            ->where('display', 'private')
            ->where('active', true)
            ->first();

        if (! $quiz) {
            return redirect()->back()->with('error', 'Invalid access code.');
        }

        return redirect()->route('quizzes.show', $quiz->id);
    }

    /** List pending invitations for the authenticated user */
    public function myInvitations()
    {
        $invitations = QuizInvitation::where('email', Auth::user()->email)
            ->where('status', 'pending')
            ->with('quiz')
            ->latest()
            ->get();

        return Inertia::render('Invitations/Index', compact('invitations'));
    }
}
