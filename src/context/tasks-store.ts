import { Task, TaskCategories } from '@prisma/client';
import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

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
    moveTask: (id: string, index: number, category: TaskCategories) => void;

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

    moveTask(id, index, category) {
        const task = get().tasks.find((task) => task.id === id);
        const tasks = get().getTasksByCategory(category);

        if (!task) return;

        const tasksFromPreviousCategory = get()
            .getTasksByCategory(task.category)
            .filter((task) => task.id !== id);

        assignCorrectIndexPosition(
            tasksFromPreviousCategory,
            index,
            task,
            false
        );

        let tasksToStore: Task[] = [];

        if (task.category === category) {
            tasksToStore = tasks.filter((task) => task.id !== id);
        }

        assignCorrectIndexPosition(tasksToStore, index, task, true);
        set({ tasks: tasksToStore });
    },

    getTaskCount: () => get().tasks.length,
    getPartialTaskCount(category) {
        return get().tasks.filter((task) => task.category === category).length;
    },
}));

export const searchTasks = (tasks: Task[], query: string) => {
    return tasks.filter((task) =>
        task.title.toLowerCase().startsWith(query.toLowerCase())
    );
};

function assignCorrectIndexPosition(
    tasks: Task[],
    idx: number,
    task: Task,
    shouldIncrement = false
) {
    const newTasks = tasks.map((task) => {
        if (task.indexPosition > idx) {
            shouldIncrement ? task.indexPosition++ : task.indexPosition--;
        }

        return task;
    });

    newTasks[idx] = { ...task, indexPosition: idx };
    return newTasks;
}

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('TaskStore', useTaskStore);
}
