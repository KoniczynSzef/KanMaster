import { TaskCategories } from '@prisma/client';

export type Column = {
    title: string;
    category: TaskCategories;
    className?: string;
};
