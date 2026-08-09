<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add access_code to quizzes
        Schema::table('quizzes', function (Blueprint $table) {
            $table->string('access_code')->nullable()->unique()->after('display');
            $table->integer('time_limit')->nullable()->after('access_code'); // in minutes
        });

        Schema::create('quiz_invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->foreignId('invited_by')->constrained('users')->onDelete('cascade');
            $table->string('email');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('token')->unique();
            $table->enum('status', ['pending', 'accepted', 'declined'])->default('pending');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_invitations');
        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropColumn(['access_code', 'time_limit']);
        });
    }
};
