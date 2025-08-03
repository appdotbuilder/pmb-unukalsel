import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="PMB UNUKA Kalsel - Sistem Penerimaan Mahasiswa Baru" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <AppLogo className="h-10 w-10" />
                            <div>
                                <h1 className="text-lg font-bold text-green-800">PMB UNUKA Kalsel</h1>
                                <p className="text-xs text-green-600">Penerimaan Mahasiswa Baru</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="text-green-600 hover:text-green-700 font-medium"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-green-600 hover:text-green-700 font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Daftar Sekarang
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
                            🎓 Selamat Datang di PMB UNUKA Kalsel
                        </h2>
                        <p className="text-xl text-green-700 mb-8 leading-relaxed">
                            Sistem Penerimaan Mahasiswa Baru Universitas Nahdlatul Ulama Kalimantan Selatan. 
                            Daftar sekarang dan wujudkan mimpimu bersama kami!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            {!auth?.user && (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                                            📝 Daftar Sebagai Calon Mahasiswa
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                                            🔑 Masuk ke Akun
                                        </Button>
                                    </Link>
                                </>
                            )}
                            {auth?.user && (
                                <Link href="/dashboard">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                                        📊 Lihat Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center text-green-800 mb-12">
                            ✨ Fitur Unggulan Sistem PMB
                        </h3>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center p-6 rounded-lg bg-green-50">
                                <div className="text-4xl mb-4">📋</div>
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Pendaftaran Online</h4>
                                <p className="text-green-600 text-sm">
                                    Daftar sebagai calon mahasiswa dengan mudah dan cepat
                                </p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg bg-green-50">
                                <div className="text-4xl mb-4">👤</div>
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Biodata Lengkap</h4>
                                <p className="text-green-600 text-sm">
                                    Isi biodata dan upload dokumen persyaratan dengan aman
                                </p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg bg-green-50">
                                <div className="text-4xl mb-4">📊</div>
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Dashboard Real-time</h4>
                                <p className="text-green-600 text-sm">
                                    Pantau status pendaftaran dan kelengkapan dokumen
                                </p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg bg-green-50">
                                <div className="text-4xl mb-4">🎯</div>
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Program Studi</h4>
                                <p className="text-green-600 text-sm">
                                    Pilih dari berbagai program studi unggulan
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Study Programs Preview */}
                <section className="py-16 bg-green-50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center text-green-800 mb-12">
                            🏫 Program Studi Unggulan
                        </h3>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: 'Teknik Informatika', code: 'TI', icon: '💻' },
                                { name: 'Sistem Informasi', code: 'SI', icon: '🖥️' },
                                { name: 'Manajemen', code: 'MN', icon: '📈' },
                                { name: 'Akuntansi', code: 'AK', icon: '💰' },
                                { name: 'Hukum', code: 'HK', icon: '⚖️' },
                                { name: 'Pendidikan Agama Islam', code: 'PAI', icon: '📚' },
                                { name: 'Ekonomi Syariah', code: 'ES', icon: '🏛️' },
                                { name: 'Komunikasi dan Penyiaran Islam', code: 'KPI', icon: '📻' },
                            ].map((program) => (
                                <div key={program.code} className="bg-white p-4 rounded-lg shadow-sm text-center">
                                    <div className="text-3xl mb-2">{program.icon}</div>
                                    <h4 className="font-semibold text-green-800 text-sm mb-1">{program.name}</h4>
                                    <p className="text-green-600 text-xs">({program.code})</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth?.user && (
                    <section className="bg-green-600 py-16 text-white">
                        <div className="container mx-auto px-4 text-center">
                            <h3 className="text-3xl font-bold mb-4">🚀 Siap Memulai Perjalanan Akademikmu?</h3>
                            <p className="text-xl mb-8 text-green-100">
                                Bergabunglah dengan ribuan mahasiswa UNUKA Kalsel dan raih masa depan cerah!
                            </p>
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 font-semibold">
                                    📝 Daftar Sekarang - GRATIS!
                                </Button>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-green-800 text-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <AppLogo className="h-8 w-8" />
                            <div>
                                <h4 className="font-semibold">PMB UNUKA Kalsel</h4>
                                <p className="text-xs text-green-200">Sistem Penerimaan Mahasiswa Baru</p>
                            </div>
                        </div>
                        <p className="text-green-200 text-sm">
                            © 2024 Universitas Nahdlatul Ulama Kalimantan Selatan. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}