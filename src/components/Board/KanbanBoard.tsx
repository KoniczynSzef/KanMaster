'use client';

import { columns } from '@/assets/columns';
import { Project, Task, User } from '@prisma/client';
import React, { FC } from 'react';
import BoardHeader from './header/BoardHeader';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';
import CreateTask from './create-dialog/CreateTask';
import TaskComponent from './TaskComponent';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
}

const KanbanBoard: FC<Props> = ({ tasks, project }) => {
    return (
        <section className="board border border-muted rounded max-w-7xl w-full">
            <BoardHeader columns={columns} />

            <div className="wrapper flex items-center">
                <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                    {tasks
                        .filter((task) => task.category === 'todo')
                        .map((task) => (
                            <TaskComponent key={task.id} task={task} />
                        ))}
                    <CreateTask project={project} />
                </div>
                <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                    {tasks
                        .filter((task) => task.category === 'inProgress')
                        .map((task) => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                </div>
                <div className="e w-1/3 py-6 px-2 items-center flex flex-col">
                    {tasks
                        .filter((task) => task.category === 'done')
                        .map((task) => (
                            <div key={task.id}>{task.title}</div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default KanbanBoard;
