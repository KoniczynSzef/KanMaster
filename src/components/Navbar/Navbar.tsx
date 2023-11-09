import Link from 'next/link';
import React, { FC } from 'react';
import ToggleTheme from './ToggleTheme';
import Notification from './Notification';
import UserDropdownMenu from './UserDropdownMenu';

interface Props {}

const Navbar: FC<Props> = () => {
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
                    <Notification />
                    <UserDropdownMenu />
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
