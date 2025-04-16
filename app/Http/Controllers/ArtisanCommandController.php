<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ArtisanCommandController extends Controller
{
    public function __invoke(Request $request)
    {
        $key = $request->input('key');
        $command = $request->input('command');

        if ($key !== env('ARTISAN_ROUTE_KEY')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Only allow safe commands
        $allowedCommands = [
            'db:seed',
            // Add more if needed
        ];

        if (!in_array($command, $allowedCommands)) {
            return response()->json(['error' => 'Command not allowed'], 400);
        }

        // Optional: allow class name for seeders
        $options = ['--force' => true];
        if ($command === 'db:seed' && $request->has('class')) {
            $options['--class'] = $request->input('class');
        }

        Artisan::call($command, $options);

        return response()->json([
            'message' => "Artisan command [$command] executed successfully!",
            'output' => Artisan::output()
        ]);
    }
}
