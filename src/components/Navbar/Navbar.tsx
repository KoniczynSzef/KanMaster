import Link from 'next/link';
import React, { FC } from 'react';
import ToggleTheme from './ToggleTheme';
import Notification from './Notification';
import UserDropdownMenu from './UserDropdownMenu';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import SignIn from './SignIn';

interface Props {}
const email = 'koniczynszef@gmail.com';

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
                            <UserDropdownMenu
                                email={email}
                                user={session.user}
                            />
                        </>
                    ) : (
                        <SignIn />
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
