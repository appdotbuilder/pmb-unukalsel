import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Stats {
    total_applicants: number;
    complete_biodata: number;
    incomplete_biodata: number;
}

interface StudyProgramStats {
    name: string;
    code: string;
    total_applicants: number;
}

interface RecentApplicant {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    study_program?: {
        name: string;
        code: string;
    };
    is_complete: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    study_program_stats: StudyProgramStats[];
    recent_applicants: RecentApplicant[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, study_program_stats, recent_applicants }: Props) {
    const completionRate = stats.total_applicants > 0 
        ? Math.round((stats.complete_biodata / stats.total_applicants) * 100)
        : 0;

    return (
        <>
            <Head title="Dashboard Admin - PMB UNUKA Kalsel" />
            
            <AppShell>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                        <h1 className="text-2xl font-bold mb-2">👨‍💼 Dashboard Administrator</h1>
                        <p className="text-blue-100">
                            Kelola sistem PMB UNUKA Kalsel dan pantau pendaftaran mahasiswa baru
                        </p>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
                                <span className="text-2xl">👥</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">{stats.total_applicants}</div>
                                <p className="text-xs text-muted-foreground">Calon mahasiswa terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Biodata Lengkap</CardTitle>
                                <span className="text-2xl">✅</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{stats.complete_biodata}</div>
                                <p className="text-xs text-muted-foreground">
                                    {completionRate}% dari total pendaftar
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Biodata Belum Lengkap</CardTitle>
                                <span className="text-2xl">⏳</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">{stats.incomplete_biodata}</div>
                                <p className="text-xs text-muted-foreground">Perlu tindak lanjut</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tingkat Kelengkapan</CardTitle>
                                <span className="text-2xl">📊</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
                                <p className="text-xs text-muted-foreground">Rata-rata kelengkapan</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>⚡</span>
                                <span>Tindakan Cepat</span>
                            </CardTitle>
                            <CardDescription>
                                Kelola sistem PMB dengan mudah
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/students">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        👥 Kelola Mahasiswa
                                    </Button>
                                </Link>
                                <Link href="/study-programs">
                                    <Button variant="outline">
                                        🏫 Kelola Program Studi
                                    </Button>
                                </Link>
                                <Link href="/students/export">
                                    <Button variant="outline">
                                        📄 Export Data
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Study Program Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>📈</span>
                                <span>Statistik Program Studi</span>
                            </CardTitle>
                            <CardDescription>
                                Jumlah pendaftar per program studi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {study_program_stats.length > 0 ? (
                                <div className="space-y-4">
                                    {study_program_stats.map((program) => (
                                        <div key={program.code} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <div className="font-medium">{program.name}</div>
                                                <div className="text-sm text-gray-500">({program.code})</div>
                                            </div>
                                            <Badge variant="secondary">
                                                {program.total_applicants} pendaftar
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Belum ada data program studi
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Applicants */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>🕒</span>
                                <span>Pendaftar Terbaru</span>
                            </CardTitle>
                            <CardDescription>
                                5 pendaftar terakhir yang mendaftar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_applicants.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_applicants.map((applicant) => (
                                        <div key={applicant.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <div className="font-medium">{applicant.user.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {applicant.study_program?.name || 'Belum memilih program'}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(applicant.created_at).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant={applicant.is_complete ? 'default' : 'secondary'}>
                                                    {applicant.is_complete ? 'Lengkap' : 'Belum Lengkap'}
                                                </Badge>
                                                <Link href={`/students/${applicant.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        Lihat
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Belum ada pendaftar
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}