import { Project, Task, TaskCategories } from '@prisma/client';
import React, { FC } from 'react';
import TaskComponent from './TaskComponent';
import CreateTask from '../create-dialog/CreateTask';

type Props = {
    array: Task[];
    handleDragStart: (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => void;
    handleOnDrop: (
        e: React.DragEvent<HTMLElement>,
        category: TaskCategories
    ) => void;
    category: TaskCategories;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;

    areTaskTodo: boolean;
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
        <section
            className="e w-1/3 py-6 px-2 items-center flex flex-col"
            onDrop={(e) => props.handleOnDrop(e, props.category)}
            onDragOver={props.handleDragOver}
        >
            {props.array.map((task) => (
                <TaskComponent
                    key={task.id}
                    task={task}
                    handleDragStart={props.handleDragStart}
                />
            ))}

            {props.areTaskTodo ? <CreateTask project={props.project} /> : null}
        </section>
    );
};

export default TaskSection;
