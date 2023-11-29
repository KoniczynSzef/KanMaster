'use server';

import { db } from '@/db';
import { Notification } from '@prisma/client';
import { getUser } from './user-functions';

export async function sendNotification(
    notification: Omit<Notification, 'id' | 'createdAt'>,
    isSender: boolean
) {
    const newNotification = await db.notification.create({
        data: {
            ...notification,
            isSender,
        },
    });

    return newNotification;
}

export async function getNotifications(
    email: string | null | undefined,
    isSender: boolean
) {
    const user = await getUser(email);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    if (!user.email) {
        throw new Error('User does not have an email');
    }

    const notifications = await db.notification.findMany({
        where: {
            userEmail: user.email,
            isSender,
        },
    });

    return notifications;
}
