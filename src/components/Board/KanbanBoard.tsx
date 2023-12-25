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
            {isLoading ? (
                <div className="flex justify-center items-center gap-8 py-4">
                    <h3 className="text-xl font-bold">
                        Tasks are being loaded...
                    </h3>
                    <Loader2 size={64} className="animate-spin" />
                </div>
            ) : (
                <div className="wrapper flex items-center">
                    <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                        <CreateTask createTask={createTask} />
                    </div>
                    <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                        {tasks.map((task) => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                    </div>
                    <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                        {tasks.map((task) => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default KanbanBoard;
