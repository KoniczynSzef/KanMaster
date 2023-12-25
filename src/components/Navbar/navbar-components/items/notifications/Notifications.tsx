'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BellRing } from 'lucide-react';
import React, { FC } from 'react';
import NotificationMenuItem from './NotificationMenuItem';
import { Notification } from '@prisma/client';
import { useNotificationStore } from '@/context/notification-store';

import { useQuery } from 'react-query';

interface Props {
    notifications: Notification[];
}

const Notifications: FC<Props> = ({ notifications }) => {
    const { setNotifications, notifications: storedNotifications } =
        useNotificationStore();

    useQuery({
        queryKey: ['notifications'],
        queryFn: () => {
            setNotifications(notifications);
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent rounded-full px-2 transition duration-300">
                    <div className="relative">
                        <BellRing className="text-black md:text-white dark:text-white" />
                        <span className="sr-only">
                            Notifications remaining: {notifications.length}
                        </span>
                        <div
                            aria-label="Notifications count"
                            className="absolute -bottom-3 -right-3 text-xs rounded-full px-1 pointer-events-none w-5 h-5 bg-red-700 flex items-center justify-center"
                        >
                            {notifications.length}
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>

                {storedNotifications.length > 0 &&
                    storedNotifications.map((notification) => (
                        <NotificationMenuItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
