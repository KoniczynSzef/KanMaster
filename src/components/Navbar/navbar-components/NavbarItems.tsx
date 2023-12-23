import React, { FC } from 'react';
import ToggleTheme from './items/ToggleTheme';
import Notification from './items/notifications/Notification';
import UserDropdownMenu from './items/UserDropdownMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Session } from 'next-auth';
import { SheetTrigger } from '@/components/ui/sheet';
import { getNotifications } from '@/controllers/notification-functions';

interface Props extends React.ComponentProps<'ul'> {
    className?: string;
    session: Session | null;
    mobile: boolean;
}

const NavbarItems: FC<Props> = async ({ session, className, mobile }) => {
    const notifications = await getNotifications(session?.user?.email, false);

    return (
        <ul className={`${className} wrapper flex items-center gap-10`}>
            <ToggleTheme />
            {session?.user ? (
                <>
                    <Notification notifications={notifications} />
                    <UserDropdownMenu user={session.user} />
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
