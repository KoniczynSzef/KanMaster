import { stars } from '@/assets/stars';
import { options } from '@/auth/options';
import ImageCard from '@/components/Home/ImageCard';
import StarCard from '@/components/Home/StarCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import kanban from '../../public/kanban.png';
import people from '../../public/people.png';
import Link from 'next/link';

export default async function Home() {
    const session = await getServerSession(options);

    if (session?.user) {
        return redirect('/dashboard');
    }

    return (
        <main>
            <div className="custom-gradient absolute -z-10 h-full bottom-0" />
            <section className="py-32 container mx-auto relative flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-paletteDarkerRed to-paletteVioletMain dark:from-paletteLighterRed dark:to-paletteBlue text-center font-bold py-2">
                    Discover the Power of Kanban. Manage Projects the Easy Way
                </h1>

                <p className="text-center text-xl mt-8 text-muted-foreground max-w-xl">
                    Elevate your projects, unite your team. KanMaster - where
                    successful project management begins
                </p>

                <article className="flex w-full flex-wrap gap-32 mt-32 items-center justify-center">
                    {stars.map((star, idx) => (
                        <StarCard key={idx} star={star} idx={idx} />
                    ))}
                </article>
            </section>

            <section className="container relative mx-auto flex flex-col items-center mt-24 lg:mt-44">
                <h2 className="text-center font-bold md:text-3xl text-4xl max-w-xl">
                    Start using{' '}
                    <span className="dark:text-violet-400 text-primary">
                        KanMaster
                    </span>{' '}
                    and experience project management at its finest.
                </h2>
            </section>

            <section className="container relative mx-auto space-y-12 my-16">
                <ImageCard
                    title="Unlock Kanban's power 🚀"
                    description="Embrace the simplicity of Kanban and unleash a new level of project efficiency and collaboration."
                    imageSrc={kanban}
                    alt="Image of Kanban board"
                />

                <ImageCard
                    title="Stronger Together 💪"
                    description="Make teamwork a breeze with Kanban. Get things done faster, work smarter, and build a stronger team. Your projects, simplified and successful!"
                    imageSrc={people}
                    alt="Image of some cards on a Kanban board"
                    isReversed
                />
            </section>

            <section className="container mx-auto relative my-32 flex flex-col items-center">
                <Link
                    href={'/sign-in'}
                    className="flex justify-center link-animation text-center"
                >
                    <h2 className="font-bold md:text-3xl text-4xl">
                        Start using{' '}
                        <span className="dark:text-violet-400 text-primary">
                            {' '}
                            KanMaster{' '}
                        </span>{' '}
                        today!
                    </h2>
                </Link>
            </section>

            <footer className="py-6 bg-paletteVioletMain dark:bg-darkPaletteVioletMain">
                <h3 className="text-xl mx-16 text-white">
                    Created by{' '}
                    <Link
                        href={'https://github.com/KoniczynSzef'}
                        className="dark:text-violet-400 text-violet-300 dark:hover:text-violet-300 hover:text-violet-200 transition duration-200"
                        target="_blank"
                    >
                        KoniczynSzef
                    </Link>
                </h3>
            </footer>
        </main>
    );
}
