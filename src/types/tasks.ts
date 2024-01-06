import { Task, TaskCategories } from '@prisma/client';
import { z } from 'zod';

export const TaskCategoriesSchema = z.union([
    z.literal<TaskCategories>('todo'),
    z.literal<TaskCategories>('inProgress'),
    z.literal<TaskCategories>('done'),
]);

export type TaskCategoriesSchemaType = z.infer<typeof TaskCategoriesSchema>;

export const taskCategories: TaskCategories[] = [
    'todo',
    'inProgress',
    'done',
] as const;

export const TaskSchema = z.object({
    title: z.string().min(3, 'Task Title must be 3 characters minimum').max(55),
    description: z.string().min(3).max(255).optional(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;

export const TaskSecondStepSchema = z.object({
    assignedPeopleEmails: z.array(z.string().email()),
    deadline: z.date(),
});

export type TaskSecondStepSchemaType = z.infer<typeof TaskSecondStepSchema>;

export type OmittedTask = Omit<Task, 'id' | 'createdAt'>;

export type TaskViewingMode = 'edit' | 'view';
