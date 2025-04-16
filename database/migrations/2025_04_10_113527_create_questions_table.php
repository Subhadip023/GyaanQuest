<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->enum('type',['mcq','true_false','saq','long'])->default('mcq');
            $table->foreignId('quizes_id')->constrained()->onDelete('cascade');
            $table->decimal('number', 5, 2)->default(1);
            $table->boolean('isActive')->default(true);
            $table->enum('display',['public','private','room'])->default('public');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
