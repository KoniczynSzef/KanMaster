import Link from 'next/link';
import React, { FC } from 'react';
import ToggleTheme from './ToggleTheme';
import Notification from './Notification';
import UserDropdownMenu from './UserDropdownMenu';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import { Button } from '../ui/button';

interface Props {}

const Navbar: FC<Props> = async () => {
    const session = await getServerSession(options);

    return (
        <header className="py-6 bg-paletteVioletMain dark:bg-darkPaletteVioletMain">
            <nav className="container mx-auto flex items-center justify-between">
                <Link href={'/'} className="group">
                    <h1 className="text-5xl font-bold text-violet-100 group-hover:text-white transition">
                        KanMaster
                    </h1>
                </Link>

                <ul className="wrapper flex items-center gap-10">
                    <ToggleTheme />
                    {session?.user ? (
                        <>
                            <Notification user={session.user} />
                            <UserDropdownMenu user={session.user} />
                        </>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href={'/sign-in'}>Sign in</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-paletteBlue hover:bg-blue-500"
                            >
                                <Link href={'/register'}>Register</Link>
                            </Button>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
