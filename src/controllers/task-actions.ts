'use server';
import { db } from '@/db';
import { BadgeColor } from '@/types/badge';
import { OmittedTask, TaskSchemaType } from '@/types/tasks';
import { Project, Task, TaskCategories } from '@prisma/client';

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

export const handleSubmit = async (
    data: TaskSchemaType,
    step: number,
    Task: OmittedTask,
    setStep: (value: React.SetStateAction<number>) => void,
    assignedUsers: string[],
    deadline: Date,
    setSubmitting: (value: React.SetStateAction<boolean>) => void,
    project: Project,
    addTask: (task: Task) => void,
    color: BadgeColor
) => {
    if (step === 1) {
        Task.title = data.title;
        Task.description = data.description || null;
        Task.category = 'todo';

        setStep((prev) => prev + 1);
        return;
    } else if (step === 2) {
        if (assignedUsers.length === 0) {
            return 'Please assign task to at least one person.';
        }

        Task.assignedPeopleEmails = assignedUsers;
        Task.deadline =
            deadline ??
            new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);

        setStep((prev) => prev + 1);
        return;
    } else if (step === 3) {
        setSubmitting(true);
        Task.projectId = project.id;
        Task.markColor = color;

        const newTask = await createTask(project.id, Task);
        addTask(newTask);

        return 'Task created successfully.';
    }
};
