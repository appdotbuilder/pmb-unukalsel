<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentBiodataRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'place_of_birth' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'full_address' => 'required|string',
            'origin_school' => 'required|string|max:255',
            'study_program_id' => 'required|exists:study_programs,id',
            'ktp_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'diploma_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'place_of_birth.required' => 'Tempat lahir harus diisi.',
            'date_of_birth.required' => 'Tanggal lahir harus diisi.',
            'date_of_birth.before' => 'Tanggal lahir harus sebelum hari ini.',
            'gender.required' => 'Jenis kelamin harus dipilih.',
            'full_address.required' => 'Alamat lengkap harus diisi.',
            'origin_school.required' => 'Asal sekolah harus diisi.',
            'study_program_id.required' => 'Program studi harus dipilih.',
            'study_program_id.exists' => 'Program studi yang dipilih tidak valid.',
            'ktp_document.required' => 'Dokumen KTP harus diunggah.',
            'ktp_document.mimes' => 'Dokumen KTP harus berformat PDF, JPG, JPEG, atau PNG.',
            'ktp_document.max' => 'Ukuran dokumen KTP maksimal 2MB.',
            'diploma_document.required' => 'Dokumen ijazah harus diunggah.',
            'diploma_document.mimes' => 'Dokumen ijazah harus berformat PDF, JPG, JPEG, atau PNG.',
            'diploma_document.max' => 'Ukuran dokumen ijazah maksimal 2MB.',
        ];
    }
}