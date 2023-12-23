import React, { FC } from 'react';
import { Notification } from '@prisma/client';
import NoNotifications from './NoNotifications';
import Notifications from './Notifications';

interface Props {
    notifications: Notification[];
}

const Notification: FC<Props> = async ({ notifications }) => {
    return (
        <>
            {notifications.length === 0 && <NoNotifications />}
            {notifications.length > 0 && (
                <Notifications notifications={notifications} />
            )}
        </>
    );
};

export default Notification;
