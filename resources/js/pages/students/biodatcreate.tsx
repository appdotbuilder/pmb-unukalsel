import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';

interface StudyProgram {
    id: number;
    name: string;
    code: string;
}

interface Props {
    studyPrograms: StudyProgram[];
    [key: string]: unknown;
}

type BiodataForm = {
    place_of_birth: string;
    date_of_birth: string;
    gender: string;
    full_address: string;
    origin_school: string;
    study_program_id: string;
    ktp_document: File | null;
    diploma_document: File | null;
};

export default function CreateBiodata({ studyPrograms }: Props) {
    const { data, setData, post, processing, errors } = useForm<BiodataForm>({
        place_of_birth: '',
        date_of_birth: '',
        gender: '',
        full_address: '',
        origin_school: '',
        study_program_id: '',
        ktp_document: null,
        diploma_document: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('biodata.store'));
    };

    return (
        <>
            <Head title="Isi Biodata - PMB UNUKA Kalsel" />
            
            <AppShell>
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                        <h1 className="text-2xl font-bold mb-2">📝 Isi Biodata Lengkap</h1>
                        <p className="text-green-100">
                            Lengkapi biodata dan upload dokumen persyaratan untuk menyelesaikan pendaftaran
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>👤</span>
                                    <span>Informasi Pribadi</span>
                                </CardTitle>
                                <CardDescription>
                                    Data pribadi calon mahasiswa
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="place_of_birth">Tempat Lahir *</Label>
                                        <Input
                                            id="place_of_birth"
                                            type="text"
                                            required
                                            value={data.place_of_birth}
                                            onChange={(e) => setData('place_of_birth', e.target.value)}
                                            placeholder="Contoh: Banjarmasin"
                                        />
                                        <InputError message={errors.place_of_birth} />
                                    </div>

                                    <div>
                                        <Label htmlFor="date_of_birth">Tanggal Lahir *</Label>
                                        <Input
                                            id="date_of_birth"
                                            type="date"
                                            required
                                            value={data.date_of_birth}
                                            onChange={(e) => setData('date_of_birth', e.target.value)}
                                        />
                                        <InputError message={errors.date_of_birth} />
                                    </div>
                                </div>

                                <div>
                                    <Label>Jenis Kelamin *</Label>
                                    <Select 
                                        value={data.gender} 
                                        onValueChange={(value) => setData('gender', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Laki-laki</SelectItem>
                                            <SelectItem value="female">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} />
                                </div>

                                <div>
                                    <Label htmlFor="full_address">Alamat Lengkap *</Label>
                                    <Textarea
                                        id="full_address"
                                        required
                                        value={data.full_address}
                                        onChange={(e) => setData('full_address', e.target.value)}
                                        placeholder="Masukkan alamat lengkap sesuai KTP"
                                        rows={3}
                                    />
                                    <InputError message={errors.full_address} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Educational Background */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🎓</span>
                                    <span>Riwayat Pendidikan</span>
                                </CardTitle>
                                <CardDescription>
                                    Informasi pendidikan terakhir dan program studi pilihan
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="origin_school">Asal Sekolah *</Label>
                                    <Input
                                        id="origin_school"
                                        type="text"
                                        required
                                        value={data.origin_school}
                                        onChange={(e) => setData('origin_school', e.target.value)}
                                        placeholder="Contoh: SMA Negeri 1 Banjarmasin"
                                    />
                                    <InputError message={errors.origin_school} />
                                </div>

                                <div>
                                    <Label>Program Studi Pilihan *</Label>
                                    <Select 
                                        value={data.study_program_id} 
                                        onValueChange={(value) => setData('study_program_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih program studi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {studyPrograms.map((program) => (
                                                <SelectItem key={program.id} value={program.id.toString()}>
                                                    {program.name} ({program.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.study_program_id} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Document Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📄</span>
                                    <span>Upload Dokumen</span>
                                </CardTitle>
                                <CardDescription>
                                    Upload dokumen persyaratan (Format: PDF, JPG, JPEG, PNG. Maksimal 2MB per file)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="ktp_document">Dokumen KTP *</Label>
                                    <Input
                                        id="ktp_document"
                                        type="file"
                                        required
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => setData('ktp_document', e.target.files?.[0] || null)}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Upload scan atau foto KTP yang jelas dan dapat dibaca
                                    </p>
                                    <InputError message={errors.ktp_document} />
                                </div>

                                <div>
                                    <Label htmlFor="diploma_document">Dokumen Ijazah *</Label>
                                    <Input
                                        id="diploma_document"
                                        type="file"
                                        required
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => setData('diploma_document', e.target.files?.[0] || null)}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Upload scan ijazah SMA/SMK/sederajat
                                    </p>
                                    <InputError message={errors.diploma_document} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {processing ? 'Menyimpan...' : '💾 Simpan Biodata'}
                            </Button>
                        </div>
                    </form>
                </div>
            </AppShell>
        </>
    );
}