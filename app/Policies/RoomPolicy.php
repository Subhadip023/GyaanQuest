<?php

namespace App\Policies;

use App\Models\Room;
use App\Models\User;

class RoomPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Room $room): bool
    {
        return $room->user_id === $user->id
            || $room->members()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'teacher', 'tutor']);
    }

    public function update(User $user, Room $room): bool
    {
        return $room->user_id === $user->id || $user->hasRole('admin');
    }

    public function delete(User $user, Room $room): bool
    {
        return $room->user_id === $user->id || $user->hasRole('admin');
    }
}
