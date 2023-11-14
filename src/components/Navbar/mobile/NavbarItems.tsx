import React, { FC } from 'react';
import ToggleTheme from './items/ToggleTheme';
import Notification from './items/Notification';
import UserDropdownMenu from './items/UserDropdownMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Session } from 'next-auth';

interface Props extends React.ComponentProps<'ul'> {
    className?: string;
    session: Session | null;
}

const NavbarItems: FC<Props> = ({ session, className }) => {
    return (
        <ul className={`${className} wrapper flex items-center gap-10`}>
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
    );
};

export default NavbarItems;
