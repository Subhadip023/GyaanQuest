<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
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
            'question' => ['required', 'string'],
            'type' => ['required', 'in:mcq,true_false,saq,long'],
            'quizes_id' => ['required', 'exists:quizes,id'],
            'number' => ['required', 'numeric', 'between:0,999.99'],
            'isActive' => ['required', 'boolean'],
            'display' => ['required', 'in:public,private,room'],
            ];
       
        
    }
}
