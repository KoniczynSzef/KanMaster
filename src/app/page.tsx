import { options } from '@/auth/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
    const session = await getServerSession(options);

    if (session?.user) {
        return redirect('/dashboard');
    }

    return (
        <main className="pt-24 container mx-auto">
            <h1 className="font-bold text-4xl">KanMaster</h1>
        </main>
    );
}
