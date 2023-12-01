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

export const joinProject = async (
    notification: Notification,
    userEmail: string | null | undefined
) => {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    if (!user.email) {
        throw new Error('User does not have an email');
    }

    console.log(notification);

    const updatedProject = await db.project.update({
        where: { id: notification.projectId },
        data: {
            memberEmails: {
                push: user.email,
            },
        },
    });

    return updatedProject;
};

export const deleteNotification = async (notificationId: string) => {
    const deletedNotification = await db.notification.delete({
        where: { id: notificationId },
    });

    return deletedNotification;
};
