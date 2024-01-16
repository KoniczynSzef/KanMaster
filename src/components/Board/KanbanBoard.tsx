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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

const KanbanBoard: FC<Props> = ({ project, user, refetch }) => {
    const [open, setOpen] = React.useState(false);
    const { tasks, getSingleTask, moveTask } = useTaskStore();

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

                await refetch();

                return toast.success('Task moved successfully');
            }

            if (
                project.teamLeaderId === user.id ||
                task?.assignedPeopleEmails.includes(user.email)
            ) {
                moveTask(taskId, newIdx, category);

                await changeTaskCategoryAsync(taskId, category);
                await changeTaskIndexPosition(taskId, newIdx);
                await refetch();

                return toast.success('Task moved successfully');
            }

            toast.error('You are not allowed to move this task');
        } catch (error) {
            console.error(error);

            toast.error(JSON.stringify(error));
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

                {/android|iphone|kindle|silk|webos|blackberry|opera mini|opera mobi/i.test(
                    navigator.userAgent.toLowerCase()
                ) && !window.localStorage.getItem('mobileDialog') ? (
                    <Dialog
                        defaultOpen
                        onOpenChange={() => {
                            setTimeout(() => {
                                setOpen(false);
                                window.localStorage.setItem(
                                    'mobileDialog',
                                    'true'
                                );
                            }, 10000);
                        }}
                        open={open}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Mobile Devices</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                {
                                    "Currently this application doesn't allow you to drag and drop tasks on mobile devices. Please use a desktop device to use this feature."
                                }
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                ) : null}
            </section>
        </ScrollArea>
    );
};

export default KanbanBoard;
