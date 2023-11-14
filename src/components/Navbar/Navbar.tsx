import Link from 'next/link';
import React, { FC } from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import NavbarMenu from './mobile/NavbarMenu';
import NavbarItems from './mobile/items/NavbarItems';

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

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size={'icon'}>
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <NavbarMenu session={session} />
                    </Sheet>
                </div>

                <NavbarItems session={session} className="hidden md:flex" />
            </nav>
        </header>
    );
};

export default Navbar;
