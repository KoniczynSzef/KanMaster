'use client';

import React, { FC } from 'react';
import type { Notification, User } from '@prisma/client';
import NoNotifications from './NoNotifications';
import Notifications from './Notifications';
import { getNotifications } from '@/controllers/notification-functions';
import { useQuery } from 'react-query';
import { Loader2 } from 'lucide-react';
import { useNotificationStore } from '@/context/notification-store';
import { useUserStore } from '@/context/user-store';

interface Props {
    user: User | null;
}

const Notification: FC<Props> = ({ user }) => {
    const { user: storedUser, setUser } = useUserStore();

    useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            setUser(user);
        },
    });

    const { setNotifications, notifications } = useNotificationStore();
    const { isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            if (storedUser) {
                const n = await getNotifications(storedUser.email, false);
                setNotifications(n);

                return n;
            }
        },
    });

    return (
        <>
            {isLoading && <Loader2 className="animate-spin" />}

            {!isLoading && notifications && notifications.length === 0 && (
                <NoNotifications />
            )}

            {!isLoading && notifications && notifications.length > 0 && (
                <Notifications notifications={notifications} />
            )}
        </>
    );
};

export default Notification;
