<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuizeRequest extends FormRequest
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
                Rule::unique('quizes')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                }),
            ],
            'description' => ['nullable', 'string'],
            'display' => ['required', Rule::in(['public', 'private', 'room'])],
        ];
    }
}
