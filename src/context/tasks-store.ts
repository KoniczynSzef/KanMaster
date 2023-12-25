import { Task, TaskCategories } from '@prisma/client';
import { create } from 'zustand';

export type TaskStore = {
    tasks: Task[];

    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;

    getTasks: () => Task[];
    getSingleTask: (id: string) => Task | undefined;
    setTasks: (tasks: Task[]) => void;

    getCompletedTasks: () => Task[];
    setCompleted: (id: string, completed: boolean) => void;

    updateTask: (id: string, taskData: Task) => void;

    getTasksByCategory: (category: TaskCategories) => Task[];
    changeTaskCategory: (id: string, category: TaskCategories) => void;

    getTaskCount: () => number;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    deleteTask(id) {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        }));
    },

    getTasks: () => get().tasks,
    getSingleTask: (id) => get().tasks.find((task) => task.id === id),
    setTasks: (tasks) => set({ tasks }),

    getCompletedTasks: () => get().tasks.filter((task) => task.isCompleted),
    setCompleted(id, completed) {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, isCompleted: completed } : task
            ),
        }));
    },

    updateTask(id, taskData) {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...taskData } : task
            ),
        }));
    },

    getTasksByCategory(category) {
        return get().tasks.filter((task) => task.category === category);
    },
    changeTaskCategory(id, category) {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, category } : task
            ),
        }));
    },

    getTaskCount: () => get().tasks.length,
}));
