import { options } from '@/auth/options';
import { log } from 'console';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Home() {
    const session = await getServerSession(options);
    log(session);

    return (
        <main className="pt-24 container mx-auto">
            <h1 className="font-bold text-4xl">Sign up for more content! 🔥</h1>
        </main>
    );
}
