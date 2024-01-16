import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import React, { FC } from 'react';

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

const AccesibilityDialog: FC<Props> = ({ open, setOpen }) => {
    return (
        <Dialog
            defaultOpen
            onOpenChange={() => {
                setTimeout(() => {
                    setOpen(false);
                    window.localStorage.setItem('mobileDialog', 'true');
                }, 10000);
            }}
            open={open}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Mobile Devices</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {
                        "Currently this application doesn't allow you to drag and drop tasks on mobile devices. Please use a desktop device to use this feature."
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default AccesibilityDialog;
