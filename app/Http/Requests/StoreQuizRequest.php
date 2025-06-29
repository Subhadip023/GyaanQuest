<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                Rule::unique('quizzes')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                }),
            ],
            'description' => ['nullable', 'string'],
            'display' => ['required', Rule::in(['public', 'private', 'room'])],
            'active' => 'required | boolean'
        ];
    }
}
