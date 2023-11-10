import React, { FC } from 'react';
import { Button } from '../ui/button';
import { Bell, BellRing } from 'lucide-react';

interface Props {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

const Notification: FC<Props> = () => {
    const hasNotification = Math.random() > 0.5;
    return (
        <Button className="bg-transparent rounded-full px-2 transition duration-300">
            {hasNotification ? <BellRing /> : <Bell />}
        </Button>
    );
};

export default Notification;
