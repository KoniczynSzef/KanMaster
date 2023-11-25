'use server';

import { db } from '@/db';
import { getUser } from './user-functions';
import { Project } from '@prisma/client';

export async function getProjects(userEmail: string | null | undefined) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const userProjects = await db.project.findMany({
        where: { teamLeaderId: user.id },
        orderBy: { createdAt: 'desc' },
    });

    return userProjects;
}

export async function createProject(
    project: Omit<Project, 'id' | 'teamLeaderId' | 'createdAt'>,
    userEmail: string | null | undefined
) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const newProject = await db.project.create({
        data: {
            ...project,
            teamLeaderId: user.id,
        },
    });

    return newProject;
}
