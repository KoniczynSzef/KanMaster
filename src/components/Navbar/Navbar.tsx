import Link from 'next/link';
import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import NavbarMenu from './navbar-components/NavbarMenu';
import NavbarItems from './navbar-components/NavbarItems';
import { getUser } from '@/controllers/user-functions';

interface Props {}

const Navbar: FC<Props> = async () => {
    const session = await getServerSession(options);

    const user = await getUser(session?.user?.email as string);

    return (
        <header className="py-6 bg-paletteVioletMain dark:bg-darkPaletteVioletMain">
            <nav className="container mx-auto flex items-center justify-between">
                <Link
                    href={'/'}
                    className="group px-4 py-1 focus-visible:outline outline-white transition-all duration-200 rounded"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-violet-100 group-hover:text-white transition">
                        KanMaster
                    </h1>
                </Link>

                <div className="md:hidden">
                    <NavbarMenu user={user} />
                </div>

                <NavbarItems
                    className="hidden md:flex"
                    mobile={false}
                    user={user}
                />
            </nav>
        </header>
    );
};

export default Navbar;
