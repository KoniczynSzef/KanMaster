import { Task } from '@prisma/client';

export type TaskStore = {
    tasks: Task[];
    addTask: (task: Task) => void;

    deleteTask: (id: string) => void;

    setTasks: (tasks: Task[]) => void;
    setCompleted: (id: string, completed: boolean) => void;

    updateTask: (id: string, title: string) => void;
    changeTaskCategory: (id: string, category: string) => void;
};
