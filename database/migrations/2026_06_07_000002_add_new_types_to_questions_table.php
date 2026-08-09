<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Modify the enum to add new types
        DB::statement("ALTER TABLE questions MODIFY COLUMN type ENUM('mcq','multiple_correct','true_false','saq','long','fill_blank') DEFAULT 'mcq'");

        Schema::table('questions', function (Blueprint $table) {
            $table->string('image')->nullable()->after('question');
        });
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE questions MODIFY COLUMN type ENUM('mcq','true_false','saq','long') DEFAULT 'mcq'");

        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
