'use server';

import { db } from '@/db';
import { getUser } from './user-functions';

export async function getProjects(userEmail: string | null | undefined) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const userProjects = await db.project.findMany({
        where: {
            teamLeaderId: user.id,
        },
    });

    return userProjects;
}
