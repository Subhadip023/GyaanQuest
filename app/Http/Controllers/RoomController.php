<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoomController extends Controller
{
    /** List all rooms the current user owns or is a member of */
    public function index()
    {
        $user = Auth::user();

        $ownedRooms = Room::with(['members', 'quizzes'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $joinedRooms = $user->rooms()
            ->with(['owner', 'quizzes'])
            ->latest()
            ->get();

        return Inertia::render('Rooms/Index', compact('ownedRooms', 'joinedRooms'));
    }

    /** Show a single room with its members and quizzes */
    public function show(Room $room)
    {
        $this->authorizeRoomAccess($room);

        $room->load(['owner', 'members', 'quizzes.question']);

        return Inertia::render('Rooms/Show', compact('room'));
    }

    /** Create a new room */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $room = Room::create([
            ...$validated,
            'user_id' => Auth::id(),
            'code'    => Room::generateCode(),
        ]);

        // Owner is also a member with teacher role
        $room->members()->attach(Auth::id(), ['role' => 'teacher']);

        return redirect()->back()->with('success', 'Room created successfully!');
    }

    /** Update room details */
    public function update(Request $request, Room $room)
    {
        $this->authorize('update', $room);

        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active'   => 'sometimes|boolean',
        ]);

        $room->update($validated);

        return redirect()->back()->with('success', 'Room updated successfully!');
    }

    /** Delete a room */
    public function destroy(Room $room)
    {
        $this->authorize('delete', $room);
        $room->delete();

        return redirect()->route('rooms.index')->with('success', 'Room deleted successfully!');
    }

    /** Join a room via its code */
    public function join(Request $request)
    {
        $request->validate(['code' => 'required|string|size:6']);

        $room = Room::where('code', strtoupper($request->code))
            ->where('is_active', true)
            ->firstOrFail();

        $user = Auth::user();

        if ($room->members()->where('user_id', $user->id)->exists()) {
            return redirect()->back()->with('error', 'You are already a member of this room.');
        }

        $room->members()->attach($user->id, ['role' => 'student']);

        return redirect()->route('rooms.show', $room)->with('success', "Welcome to {$room->name}!");
    }

    /** Remove a member from a room (owner only) */
    public function removeMember(Request $request, Room $room)
    {
        if ($room->user_id !== Auth::id()) {
            abort(403);
        }

        $room->members()->detach($request->user_id);

        return redirect()->back()->with('success', 'Member removed.');
    }

    /** Assign a quiz to a room */
    public function assignQuiz(Request $request, Room $room)
    {
        if ($room->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'quiz_id'         => 'required|exists:quizzes,id',
            'available_from'  => 'nullable|date',
            'available_until' => 'nullable|date|after_or_equal:available_from',
        ]);

        $room->quizzes()->syncWithoutDetaching([
            $validated['quiz_id'] => [
                'available_from'  => $validated['available_from'] ?? null,
                'available_until' => $validated['available_until'] ?? null,
            ],
        ]);

        return redirect()->back()->with('success', 'Quiz assigned to room!');
    }

    /** Leave a room (members only, not owner) */
    public function leave(Room $room)
    {
        $user = Auth::user();

        if ($room->user_id === $user->id) {
            return redirect()->back()->with('error', 'You are the owner. Delete the room instead.');
        }

        $room->members()->detach($user->id);

        return redirect()->route('rooms.index')->with('success', 'You have left the room.');
    }

    // ─── Private Helpers ──────────────────────────────────────────────────

    private function authorizeRoomAccess(Room $room): void
    {
        $user = Auth::user();
        $isMember = $room->members()->where('user_id', $user->id)->exists();
        $isOwner  = $room->user_id === $user->id;

        if (! $isMember && ! $isOwner) {
            abort(403, 'You are not a member of this room.');
        }
    }
}
