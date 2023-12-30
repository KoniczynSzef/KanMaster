import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import React, { FC } from 'react';
import NavbarItems from './NavbarItems';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { User } from '@prisma/client';

interface Props {
    user: User | null
}

const NavbarMenu: FC<Props> = ({ user }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-3xl font-bold">
                        KanMaster
                    </SheetTitle>
                </SheetHeader>
                <NavbarItems
                user={user}
                    className="flex-col mt-16"
                    mobile
                />
            </SheetContent>
        </Sheet>
    );
};

export default NavbarMenu;
