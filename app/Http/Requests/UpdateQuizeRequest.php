<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateQuizeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                        'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('quizes')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                })->ignore($this->quize?->id),
            ],
            'description' => ['nullable', 'string'],
            'display' => ['required', Rule::in(['public', 'private', 'room'])],
            'active' => ['required', 'boolean'],
        ];
    }
}
