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
import { toast } from 'sonner';
import { changeTaskCategoryAsync } from '@/controllers/task-actions';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

const KanbanBoard: FC<Props> = ({ project, user, refetch }) => {
    const { changeTaskCategory, getTasks, setTasks, tasks } = useTaskStore();

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => {
        e.dataTransfer.setData('widgetType', taskId);
    };

    const handleOnDrop = async (
        e: React.DragEvent<HTMLElement>,
        category: TaskCategories
    ) => {
        e.preventDefault();
        try {
            const taskId = e.dataTransfer.getData('widgetType');
            const task = tasks.find((task) => task.id === taskId);

            if (!task) return toast.error('Task not found');

            if (!user.email) return toast.error('User email not found');

            if (
                project.teamLeaderId === user.id ||
                task?.assignedPeopleEmails.includes(user.email)
            ) {
                console.log("I'm here");

                changeTaskCategory(taskId, category);
                setTasks(getTasks());

                await changeTaskCategoryAsync(taskId, category);
                await refetch();

                toast.success('Task moved successfully');
            }

            toast.error('You are not allowed to move this task');
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <section className="board border border-muted rounded max-w-7xl w-full">
            <BoardHeader columns={columns} />

            <div className="wrapper grid grid-cols-3 w-full">
                <TaskSection
                    areTaskTodo
                    project={project}
                    array={tasks.filter((task) => task.category === 'todo')}
                    category="todo"
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleOnDrop={handleOnDrop}
                />

                <TaskSection
                    areTaskTodo={false}
                    array={tasks.filter(
                        (task) => task.category === 'inProgress'
                    )}
                    category="inProgress"
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                    handleOnDrop={handleOnDrop}
                />

                <TaskSection
                    areTaskTodo={false}
                    array={tasks.filter((task) => task.category === 'done')}
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
