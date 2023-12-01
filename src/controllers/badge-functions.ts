'use server';

import { db } from '@/db';
import { Project, ProjectBadge } from '@prisma/client';
import { getUser } from './user-functions';
import { projectType } from '@/context/project-store';

export async function getBadge(projectId: string) {
    const badge = await db.projectBadge.findUnique({
        where: { projectId },
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

export async function getBadges(
    userEmail: string | null | undefined,
    projects: Project[] | projectType[]
) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const projectBadges = await db.projectBadge.findMany({
        where: {
            projectId: {
                in: projects.map((project) => project.id ?? ''),
            },
        },
    });

    return projectBadges;
}
