'use client';

import React, { FC } from 'react';
import type { Notification } from '@prisma/client';
import NoNotifications from './NoNotifications';
import Notifications from './Notifications';
import { getNotifications } from '@/controllers/notification-functions';
import { Session } from 'next-auth';
import { useQuery } from 'react-query';
import { Loader2 } from 'lucide-react';
import { useNotificationStore } from '@/context/notification-store';

interface Props {
    session: Session | null;
}

const Notification: FC<Props> = ({ session }) => {
    const { setNotifications, notifications } = useNotificationStore();
    const { isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            if (session?.user?.email) {
                const n = await getNotifications(session?.user?.email, false);
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
