'use server';

import { db } from '@/db';

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
