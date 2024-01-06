'use server';
import { db } from '@/db';
import { OmittedTask } from '@/types/tasks';
import { Task, TaskCategories } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getTasks(projectId: string) {
    const tasks = await db.task.findMany({
        where: {
            projectId,
        },
    });

    return tasks;
}

export async function getSingleTask(id: string) {
    const task = await db.task.findUnique({
        where: {
            id,
        },
    });

    return task;
}

export async function createTask(
    projectId: string,
    data: Omit<OmittedTask, 'projectId'>
) {
    const task = await db.task.create({
        data: {
            projectId: projectId,
            ...data,
        },
    });

    return task;
}

export async function updateTask(id: string, data: Partial<Task>) {
    const task = await db.task.update({
        where: {
            id,
        },
        data,
    });

    revalidatePath(`/dashboard/projects/${task.projectId}`);

    return task;
}

export async function changeTaskCategoryAsync(
    taskId: string,
    category: TaskCategories
) {
    const task = await db.task.update({
        where: {
            id: taskId,
        },
        data: {
            category,
        },
    });

    return task;
}

export async function deleteTask(id: string) {
    const task = await db.task.delete({
        where: {
            id,
        },
    });

    return task;
}

export async function completeTask(id: string) {
    const task = await db.task.update({
        where: {
            id,
        },
        data: {
            isCompleted: true,
            category: 'done',
        },
    });

    revalidatePath(`/dashboard/projects/${task.projectId}`);

    return task;
}

export async function deleteCompletedTasks(projectId: string) {
    const tasks = await db.task.deleteMany({
        where: {
            projectId,
            isCompleted: true,
        },
    });

    revalidatePath(`/dashboard/projects/${projectId}`);

    return tasks;
}
