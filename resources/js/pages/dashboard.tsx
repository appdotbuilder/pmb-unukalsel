import React, { useEffect } from 'react';
import { Head, router } from '@inertiajs/react';

export default function Dashboard() {
    // This component should not be reached as the controller redirects based on role
    // But in case it does, redirect to home
    useEffect(() => {
        router.visit('/');
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        </>
    );
}