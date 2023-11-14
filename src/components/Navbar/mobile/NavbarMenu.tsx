import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import React, { FC } from 'react';
import NavbarItems from './NavbarItems';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface Props {
    session: Session | null;
}

const NavbarMenu: FC<Props> = ({ session }) => {
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
                    session={session}
                    className="flex-col mt-16"
                    mobile
                />
            </SheetContent>
        </Sheet>
    );
};

export default NavbarMenu;
