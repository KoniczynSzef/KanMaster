import React, { FC } from 'react';
import ToggleTheme from './items/ToggleTheme';
import Notification from './items/notifications/Notification';
import UserDropdownMenu from './items/UserDropdownMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SheetTrigger } from '@/components/ui/sheet';
import { User } from '@prisma/client';

interface Props extends React.ComponentProps<'ul'> {
    className?: string;
    mobile: boolean;
    user: User | null;
}

const NavbarItems: FC<Props> = ({ className, mobile, user }) => {
    return (
        <ul className={`${className} wrapper flex items-center gap-10`}>
            <ToggleTheme />
            {user ? (
                <>
                    <Notification user={user} />
                    <UserDropdownMenu user={user} />
                </>
            ) : !mobile ? (
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
            ) : (
                <>
                    <SheetTrigger asChild>
                        <Button asChild>
                            <Link href={'/sign-in'}>Sign in</Link>
                        </Button>
                    </SheetTrigger>

                    <SheetTrigger asChild>
                        <Button
                            asChild
                            className="bg-paletteBlue hover:bg-blue-500"
                        >
                            <Link href={'/register'}>Register</Link>
                        </Button>
                    </SheetTrigger>
                </>
            )}
        </ul>
    );
};

export default NavbarItems;
