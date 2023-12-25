import { TaskCategories } from '@prisma/client';
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
