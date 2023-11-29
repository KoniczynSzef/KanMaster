'use server';

import { db } from '@/db';
import { getUser } from './user-functions';
import { Project } from '@prisma/client';

export async function getProjects(
    userEmail: string | null | undefined,
    page: number
) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const userProjects = await db.project.findMany({
        where: { teamLeaderId: user.id },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * 6,
        take: 6,
    });

    return userProjects;
}

export async function getProjectsLength(userEmail: string | null | undefined) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    const projectsLength = await db.project.count({
        where: { teamLeaderId: user.id },
    });

    return projectsLength;
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

export async function deleteProject(
    projectId: string,
    userEmail: string | null | undefined
) {
    const user = await getUser(userEmail);

    if (!user) {
        throw new Error('There is no user with that email');
    }

    await db.projectBadge.deleteMany({
        where: { projectId, AND: { userId: user.id } },
    });

    const deletedProject = await db.project.delete({
        where: { id: projectId },
    });

    return deletedProject;
}
