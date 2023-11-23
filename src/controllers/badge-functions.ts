'use server';

import { db } from '@/db';
import { ProjectBadge } from '@prisma/client';

export async function getBadge(projectId: string) {
    const badge = await db.projectBadge.findUnique({
        where: { projectId: projectId },
    });

    return badge;
}

export async function createBadge(
    projectId: string | undefined,
    badge: Omit<ProjectBadge, 'id'>
) {
    if (!projectId) {
        throw new Error('Project ID is missing');
    }

    const newBadge = await db.projectBadge.create({
        data: {
            ...badge,
            projectId: projectId,
        },
    });

    return newBadge;
}
