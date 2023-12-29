'use client';

import { columns } from '@/assets/columns';
import { Project, Task, TaskCategories, User } from '@prisma/client';
import React, { FC } from 'react';
import BoardHeader from './header/BoardHeader';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';
import { useTaskStore } from '@/context/tasks-store';
import TaskSection from './tasks/TaskSection';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

const KanbanBoard: FC<Props> = ({ tasks, project }) => {
    const [selectedTaskId, setSelectedTaskId] = React.useState<string>('');
    const { changeTaskCategory } = useTaskStore();

    const tasksTodo = tasks.filter((task) => task.category === 'todo');
    const tasksInProgress = tasks.filter(
        (task) => task.category === 'inProgress'
    );
    const tasksDone = tasks.filter((task) => task.category === 'done');

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => {
        // setSelectedTaskId(taskId);

        e.dataTransfer.setData('widgetType', taskId);
    };

    const handleOnDrop = (
        e: React.DragEvent<HTMLElement>,
        category: TaskCategories
    ) => {
        e.preventDefault();

        const taskId = e.dataTransfer.getData('widgetType');
        const task = tasks.find((task) => task.id === taskId);

        if (!task) return;

        changeTaskCategory(taskId, category);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <section className="board border border-muted rounded max-w-7xl w-full">
            <BoardHeader columns={columns} />

            <div className="wrapper flex items-center">
                <TaskSection
                    areTaskTodo
                    project={project}
                    array={tasksTodo}
                    category="todo"
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleOnDrop={handleOnDrop}
                />

                <TaskSection
                    areTaskTodo={false}
                    array={tasksInProgress}
                    category="inProgress"
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleOnDrop={handleOnDrop}
                />

                <TaskSection
                    areTaskTodo={false}
                    array={tasksDone}
                    category="done"
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleOnDrop={handleOnDrop}
                />
            </div>
        </section>
    );
};

export default KanbanBoard;
