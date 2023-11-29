'use server';

import { db } from '@/db';
import { Notification } from '@prisma/client';
import { getUser } from './user-functions';

export async function sendNotification(
    notification: Notification,
    userId: string,
    isSender: boolean
) {
    const newNotification = await db.notification.create({
        data: {
            ...notification,
            userId,
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

    console.log(user);

    const notifications = await db.notification.findMany({
        where: { userId: user.id, isSender },
    });

    return notifications;
}
