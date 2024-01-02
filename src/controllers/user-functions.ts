'use server';

import { db } from '@/db';
import { User } from '@prisma/client';

export async function getUser(uniqueCredential: string | null | undefined) {
    if (!uniqueCredential) {
        return null;
    }

    const user = await db.user.findUnique({
        where: {
            email: uniqueCredential,
        },
    });

    if (!user) {
        return null;
    }

    return user;
}

export const getUserByUniqueProp = async (prop: keyof User, value: string) => {
    const user = await db.user.findMany({
        where: {
            [prop]: value,
        },
    });

    if (user.length === 0) {
        return null;
    }

    if (user.length > 1) {
        throw new Error('Multiple users found');
    }

    return user[0];
};
