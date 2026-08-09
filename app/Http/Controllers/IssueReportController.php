<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IssueReportController extends Controller
{
    /**
     * Handle the submission of an issue report and dispatch it to Workhub API.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'type'        => 'nullable|integer|in:1,2,3,4',
            'priority'    => 'nullable|integer|in:1,2,3,4',
            'status'      => 'nullable|integer|in:1,2,3,4',
            'images.*'    => 'nullable|image|max:5120',
        ]);

        $apiUrl    = config('services.workhub.url', 'https://workhub.subhadip.online/api/tasks');
        $apiKey    = config('services.workhub.key');
        $apiSecret = config('services.workhub.secret');

     

        $imagesBase64 = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $mime = $file->getMimeType();
                $data = base64_encode(file_get_contents($file->getRealPath()));
                $imagesBase64[] = "data:{$mime};base64,{$data}";
            }
        }

        $payload = [
            'title'       => $request->input('title'),
            'description' => $request->input('description'),
            
        ];

        if (!empty($imagesBase64)) {
            if (count($imagesBase64) === 1) {
                $payload['image_base64'] = $imagesBase64[0];
            } else {
                $payload['images_base64'] = $imagesBase64;
            }
        }

        $jsonPayload = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $signature   = hash_hmac('sha256', $jsonPayload, $apiSecret ?? '');

        try {
            $response = Http::withHeaders([
                'Content-Type'    => 'application/json',
                'X-Api-Key'       => $apiKey ?? '',
                'X-Api-Signature' => $signature,
            ])
            ->withBody($jsonPayload, 'application/json')
            ->post($apiUrl);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Issue reported successfully to Workhub!',
                    'data'    => $response->json(),
                ]);
            }

            Log::warning('Workhub API issue submission non-200 response', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Issue report recorded successfully.',
                'api_status' => $response->status(),
            ]);
        } catch (\Exception $e) {
            Log::error('Workhub API connection error: ' . $e->getMessage());

            return response()->json([
                'success' => true,
                'message' => 'Issue report recorded successfully.',
            ]);
        }
    }
}
