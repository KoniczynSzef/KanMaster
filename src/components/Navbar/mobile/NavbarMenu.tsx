import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { FC } from 'react';
import NavbarItems from './items/NavbarItems';
import { Session } from 'next-auth';

interface Props {
    session: Session | null;
}

const NavbarMenu: FC<Props> = ({ session }) => {
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="text-3xl font-bold">
                    KanMaster
                </SheetTitle>
            </SheetHeader>
            <NavbarItems session={session} className="flex-col mt-16" />
        </SheetContent>
    );
};

export default NavbarMenu;
