import { Task, TaskCategories } from '@prisma/client';
import React, { FC } from 'react';
import TaskComponent from './task/TaskComponent';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';

type Props = {
    array: Task[];
    handleDragStart: (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => void;
    handleOnDrop: (
        e: React.DragEvent<HTMLElement>,
        category: TaskCategories,
        newIdx: number
    ) => void;
    category: TaskCategories;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;

    isLast?: boolean;

    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
};

const TaskSection: FC<Props> = (props) => {
    return (
        <div
            className={`border-r-secondary flex flex-col px-2 h-full pb-5 ${
                props.isLast ? '' : 'border-r'
            }`}
            onDragOver={props.handleDragOver}
        >
            {props.array.length === 0 ? (
                <div
                    onDrop={(e) => props.handleOnDrop(e, props.category, 0)}
                    className="h-full"
                />
            ) : null}
            {props.array.map((task, idx) => (
                <div
                    key={task.id}
                    onDrop={(e) => props.handleOnDrop(e, props.category, idx)}
                    className="pt-5 odd:bg-green-500 even:bg-blue-500"
                >
                    {idx}
                    <TaskComponent
                        key={task.id}
                        task={task}
                        handleDragStart={props.handleDragStart}
                    />
                </div>
            ))}
            <div
                onDrop={(e) =>
                    props.handleOnDrop(e, props.category, props.array.length)
                }
                className="h-full bg-gray-600 py-2"
            />
        </div>
    );
};

export default TaskSection;
