import { stars } from '@/assets/stars';
import { options } from '@/auth/options';
import StarCard from '@/components/Home/StarCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
    const session = await getServerSession(options);

    if (session?.user) {
        return redirect('/dashboard');
    }

    return (
        <main className="relative">
            <div className="custom-gradient absolute -z-10 h-full" />
            <section className="py-24 container mx-auto relative flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-paletteDarkerRed to-paletteVioletMain dark:from-paletteLighterRed dark:to-paletteVioletMain text-center font-bold py-2">
                    Discover the Power of Kanban. Manage Projects the Easy Way
                </h1>

                <p className="text-center text-xl mt-8 text-muted-foreground max-w-xl">
                    Elevate your projects, unite your team. KanMaster - where
                    successful project management begins
                </p>

                <article className="flex w-full flex-wrap gap-32 mt-48 items-center justify-center">
                    {stars.map((star, idx) => (
                        <StarCard key={idx} star={star} idx={idx} />
                    ))}
                </article>
            </section>
        </main>
    );
}
