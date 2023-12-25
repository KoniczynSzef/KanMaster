'use client';

import { columns } from '@/assets/columns';
import { Project, Task, User } from '@prisma/client';
import React, { FC } from 'react';
import BoardHeader from './header/BoardHeader';
import { useQuery } from 'react-query';
import { useTaskStore } from '@/context/tasks-store';
import { Loader2 } from 'lucide-react';
import CreateTask from './create-dialog/CreateTask';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
}

const KanbanBoard: FC<Props> = (props) => {
    const { setTasks, tasks } = useTaskStore();
    const { isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => {
            setTasks(props.tasks);
        },
    });

    const createTask = async () => {};

    return (
        <section className="board border border-muted rounded max-w-7xl w-full">
            <BoardHeader columns={columns} />
            <div className="wrapper flex items-center">
                <div className="e w-1/3 border-x border-x-muted py-6 px-2 items-center flex flex-col">
                    <CreateTask createTask={createTask} />
                </div>
                <div className="e w-1/3 border-x border-x-muted py-6 px-2 items-center flex flex-col">
                    {tasks.map((task) => (
                        <div key={task.id}>{task.title}</div>
                    ))}
                    <CreateTask createTask={createTask} />
                </div>
                <div className="e w-1/3 border-x border-x-muted py-6 px-2 items-center flex flex-col">
                    {tasks.map((task) => (
                        <div key={task.id}>{task.title}</div>
                    ))}
                    <CreateTask createTask={createTask} />
                </div>
            </div>
        </section>
    );
};

export default KanbanBoard;
