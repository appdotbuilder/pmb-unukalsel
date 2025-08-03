import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Biodata {
    id: number;
    place_of_birth: string | null;
    date_of_birth: string | null;
    gender: string | null;
    full_address: string | null;
    origin_school: string | null;
    study_program_id: number | null;
    is_complete: boolean;
    study_program?: {
        id: number;
        name: string;
        code: string;
    };
}

interface StudyProgram {
    id: number;
    name: string;
    code: string;
}

interface Props {
    biodata: Biodata | null;
    study_programs: StudyProgram[];
    [key: string]: unknown;
}

export default function StudentDashboard({ biodata, study_programs }: Props) {
    const completionPercentage = biodata ? calculateCompletionPercentage(biodata) : 0;

    function calculateCompletionPercentage(biodata: Biodata): number {
        const fields = [
            'place_of_birth',
            'date_of_birth', 
            'gender',
            'full_address',
            'origin_school',
            'study_program_id'
        ];
        
        const completedFields = fields.filter(field => biodata[field as keyof Biodata] !== null && biodata[field as keyof Biodata] !== '');
        return Math.round((completedFields.length / fields.length) * 100);
    }

    return (
        <>
            <Head title="Dashboard Mahasiswa - PMB UNUKA Kalsel" />
            
            <AppShell>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                        <h1 className="text-2xl font-bold mb-2">🎓 Selamat Datang, Calon Mahasiswa!</h1>
                        <p className="text-green-100">
                            Kelola biodata dan pantau status pendaftaran Anda di PMB UNUKA Kalsel
                        </p>
                    </div>

                    {/* Status Overview */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📊</span>
                                    <span>Status Biodata</span>
                                </CardTitle>
                                <CardDescription>
                                    Kelengkapan informasi pribadi Anda
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Kelengkapan</span>
                                        <Badge variant={biodata?.is_complete ? 'default' : 'secondary'}>
                                            {completionPercentage}%
                                        </Badge>
                                    </div>
                                    
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all ${
                                                biodata?.is_complete ? 'bg-green-500' : 'bg-yellow-500'
                                            }`}
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>
                                    
                                    <div className="text-sm text-gray-600">
                                        {biodata?.is_complete ? (
                                            <span className="text-green-600 font-medium">
                                                ✅ Biodata Anda sudah lengkap!
                                            </span>
                                        ) : (
                                            <span className="text-yellow-600 font-medium">
                                                ⚠️ Biodata belum lengkap, harap lengkapi.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Program Studi</span>
                                </CardTitle>
                                <CardDescription>
                                    Program studi yang Anda pilih
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {biodata?.study_program ? (
                                    <div className="space-y-2">
                                        <div className="font-semibold text-green-600">
                                            {biodata.study_program.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Kode: {biodata.study_program.code}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-sm">
                                        Belum memilih program studi
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>⚡</span>
                                <span>Tindakan Cepat</span>
                            </CardTitle>
                            <CardDescription>
                                Kelola biodata dan dokumen pendaftaran Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {biodata ? (
                                    <>
                                        <Link href={`/biodata/${biodata.id}`}>
                                            <Button variant="outline" className="w-full sm:w-auto">
                                                👁️ Lihat Biodata
                                            </Button>
                                        </Link>
                                        <Link href={`/biodata/${biodata.id}/edit`}>
                                            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                                                ✏️ Edit Biodata
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/biodata/create">
                                        <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                                            📝 Isi Biodata
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Biodata Details */}
                    {biodata && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📄</span>
                                    <span>Detail Biodata</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <label className="font-medium text-gray-700">Tempat Lahir:</label>
                                        <p className="text-gray-600">{biodata.place_of_birth || 'Belum diisi'}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="font-medium text-gray-700">Tanggal Lahir:</label>
                                        <p className="text-gray-600">
                                            {biodata.date_of_birth ? new Date(biodata.date_of_birth).toLocaleDateString('id-ID') : 'Belum diisi'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="font-medium text-gray-700">Jenis Kelamin:</label>
                                        <p className="text-gray-600">
                                            {biodata.gender === 'male' ? 'Laki-laki' : biodata.gender === 'female' ? 'Perempuan' : 'Belum diisi'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <label className="font-medium text-gray-700">Asal Sekolah:</label>
                                        <p className="text-gray-600">{biodata.origin_school || 'Belum diisi'}</p>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="font-medium text-gray-700">Alamat Lengkap:</label>
                                        <p className="text-gray-600">{biodata.full_address || 'Belum diisi'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Available Programs */}
                    {!biodata && study_programs.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🏫</span>
                                    <span>Program Studi Tersedia</span>
                                </CardTitle>
                                <CardDescription>
                                    Program studi yang dapat Anda pilih
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {study_programs.map((program) => (
                                        <div key={program.id} className="p-3 border rounded-lg">
                                            <div className="font-medium text-sm">{program.name}</div>
                                            <div className="text-xs text-gray-500">({program.code})</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </AppShell>
        </>
    );
}