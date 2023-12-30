import { getBadgeColorClass } from '@/helpers/badge-helpers';
import { OmittedTask } from '@/types/tasks';
import { Task } from '@prisma/client';
import React, { FC } from 'react';

interface Props {
    task: Task | OmittedTask;
}

const TaskBadge: FC<Props> = ({ task }) => {
    return (
        <div
            role="img"
            className={`${getBadgeColorClass(task.markColor)} h-8 w-1 rounded`}
        />
    );
};

export default TaskBadge;
