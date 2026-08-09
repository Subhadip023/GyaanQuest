<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('code')->unique(); // join code
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // owner/teacher
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('room_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('role', ['teacher', 'student'])->default('student');
            $table->timestamps();

            $table->unique(['room_id', 'user_id']);
        });

        Schema::create('room_quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->timestamp('available_from')->nullable();
            $table->timestamp('available_until')->nullable();
            $table->timestamps();

            $table->unique(['room_id', 'quiz_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_quizzes');
        Schema::dropIfExists('room_members');
        Schema::dropIfExists('rooms');
    }
};
