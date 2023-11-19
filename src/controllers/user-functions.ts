'use server';

import { db } from '@/db';

export async function getUser(uniqueCredential: string | null | undefined) {
    if (!uniqueCredential) {
        throw new Error('No unique credential provided');
    }

    const user = await db.user.findUnique({
        where: {
            email: uniqueCredential,
        },
    });

    if (!user) {
        throw new Error('There is no user with that email');
    }

    return user;
}
