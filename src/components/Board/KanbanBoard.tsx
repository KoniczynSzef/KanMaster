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
import {
    changeTaskCategoryAsync,
    changeTaskIndexPosition,
} from '@/controllers/task-actions';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

const KanbanBoard: FC<Props> = ({ project, user, refetch }) => {
    const {
        changeTaskCategory,
        getTasks,
        setTasks,
        tasks,
        getSingleTask,
        getTasksByCategory,
        moveTask,
    } = useTaskStore();

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => {
        e.dataTransfer.setData('widgetType', taskId);
    };

    const handleOnDrop = async (
        e: React.DragEvent<HTMLElement>,
        category: TaskCategories,
        newIdx: number
    ) => {
        e.preventDefault();

        try {
            const taskId = e.dataTransfer.getData('widgetType');
            const task = getSingleTask(taskId);

            if (!task) return toast.error('Task not found');

            if (!user.email) return toast.error('User email not found');

            if (task.category === category) {
                const { indexPosition } = task;

                if (indexPosition === newIdx) {
                    return toast.error('Task already in this category');
                }

                moveTask(taskId, newIdx, category);
                await changeTaskIndexPosition(taskId, newIdx);

                await changeTaskCategoryAsync(taskId, category);
                await refetch();

                return toast.success('Task moved successfully');
            }

            if (
                project.teamLeaderId === user.id ||
                task?.assignedPeopleEmails.includes(user.email)
            ) {
                changeTaskCategory(taskId, category);

                await changeTaskCategoryAsync(taskId, category);

                setTasks(getTasks());

                const index = getTasksByCategory(category).findIndex(
                    (t) => t.id === taskId
                );

                await changeTaskIndexPosition(taskId, index);

                await refetch();

                return toast.success('Task moved successfully');
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
        <ScrollArea className="w-full">
            <ScrollBar
                orientation="horizontal"
                aria-label="Horizontal scrollbar to see whole content"
            />
            <section className="board border border-muted rounded w-[83rem] md:w-full">
                <BoardHeader columns={columns} />

                <div className="wrapper grid grid-cols-3 w-full">
                    <TaskSection
                        array={tasks.filter((task) => task.category === 'todo')}
                        category="todo"
                        handleDragOver={handleDragOver}
                        handleDragStart={handleDragStart}
                        handleOnDrop={handleOnDrop}
                        refetch={refetch}
                    />

                    <TaskSection
                        array={tasks.filter(
                            (task) => task.category === 'inProgress'
                        )}
                        category="inProgress"
                        handleDragOver={handleDragOver}
                        handleDragStart={handleDragStart}
                        handleOnDrop={handleOnDrop}
                        refetch={refetch}
                    />

                    <TaskSection
                        array={tasks.filter((task) => task.category === 'done')}
                        category="done"
                        handleDragOver={handleDragOver}
                        handleDragStart={handleDragStart}
                        handleOnDrop={handleOnDrop}
                        refetch={refetch}
                        isLast
                    />
                </div>
            </section>
        </ScrollArea>
    );
};

export default KanbanBoard;
