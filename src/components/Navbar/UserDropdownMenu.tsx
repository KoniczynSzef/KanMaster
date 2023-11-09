import React, { FC } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

interface Props {
    email: string;
}

const UserDropdownMenu: FC<Props> = ({ email }) => {
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
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
