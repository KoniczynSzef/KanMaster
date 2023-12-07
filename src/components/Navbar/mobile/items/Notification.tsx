import React, { FC } from 'react';
import { Button } from '../../../ui/button';
import { Bell, BellRing } from 'lucide-react';
import { getNotifications } from '@/controllers/notification-functions';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NotificationMenuItem from './NotificationMenuItem';

interface Props {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
}

const Notification: FC<Props> = async ({ user }) => {
    const notifications = await getNotifications(user.email, false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent rounded-full px-2 transition duration-300">
                    {notifications.length > 0 ? (
                        <div className="relative">
                            <BellRing className="text-foreground"/>
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
                    ) : (
                        <Bell className="text-foreground"
 />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationMenuItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <DropdownMenuItem>No notifications</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notification;
