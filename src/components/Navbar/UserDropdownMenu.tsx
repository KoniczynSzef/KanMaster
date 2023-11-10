'use client';

import React, { FC, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { logOut } from '@/auth';
import { Loader2 } from 'lucide-react';

interface Props {
    email: string;
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

const UserDropdownMenu: FC<Props> = ({ email }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const handleSignOut = async () => {
        setIsAuthenticating(true);
        await logOut();

        setTimeout(() => {
            setIsAuthenticating(false);
        }, 250);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full px-5 bg-paletteDarkerRed dark:bg-darkPaletteDarkerRed hover:bg-paletteLighterRed dark:hover:bg-darkPaletteLighterRed transition" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
                    {email}
                </DropdownMenuLabel>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>

                <DropdownMenuSeparator />

                <div className="p-3 flex mt-2">
                    {isAuthenticating ? (
                        <div className="flex items-center gap-4">
                            <Loader2 className="animate-spin" />
                            <h4>Authenticating...</h4>
                        </div>
                    ) : (
                        <Button
                            variant={'destructive'}
                            className="ml-auto"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </Button>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
