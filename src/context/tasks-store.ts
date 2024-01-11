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

    sortByPriority: (asc: boolean) => Task[];
    moveTask: (id: string, index: number) => void;

    getTaskCount: () => number;
    getPartialTaskCount: (category: TaskCategories) => number;
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

    sortByPriority(asc) {
        set((state) => ({
            tasks: state.tasks.toSorted((a, b) =>
                asc ? a.priority - b.priority : b.priority - a.priority
            ),
        }));

        return get().tasks;
    },

    moveTask(id, index) {
        const tasks = get().tasks;
        const task = tasks.find((task) => task.id === id);
        if (!task) return;

        const taskIndex = tasks.indexOf(task);

        if (taskIndex === index) return;

        const filteredTasks = tasks.filter((task) => task.id !== id);

        if (index === 0) {
            task.indexPosition = 0;
            filteredTasks.unshift(task);
            set({ tasks: filteredTasks });
            return;
        }

        if (index === filteredTasks.length) {
            task.indexPosition = index;
            filteredTasks.push(task);
            set({ tasks: filteredTasks });
            return;
        }

        const tasksBefore = filteredTasks.slice(0, index);
        tasksBefore.forEach((task) => {
            if (task.indexPosition !== 0) task.indexPosition--;
        });

        const tasksAfter = filteredTasks.slice(index);

        const newTasks = [...tasksBefore, task, ...tasksAfter];
        set({ tasks: newTasks });
    },

    getTaskCount: () => get().tasks.length,
    getPartialTaskCount(category) {
        return get().tasks.filter((task) => task.category === category).length;
    },
}));
