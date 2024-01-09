import { Project, Task, TaskCategories } from '@prisma/client';
import React, { FC } from 'react';
import TaskComponent from './task/TaskComponent';
import CreateTask from '../create-dialog/CreateTask';
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

    areTaskTodo: boolean;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
} & (
    | {
          areTaskTodo: true;
          project: Project;
      }
    | {
          areTaskTodo: false;
      }
);

const TaskSection: FC<Props> = (props) => {
    return (
        <div
            className="border-x border-x-secondary flex flex-col px-2 h-full pb-5"
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
                    className="py-5"
                >
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
                className="h-full"
            />
            {props.areTaskTodo ? (
                <CreateTask project={props.project} refetch={props.refetch} />
            ) : null}
        </div>
    );
};

export default TaskSection;
