import { Task } from '@prisma/client';
import React, { FC } from 'react';
import * as Dialog from '../../../ui/dialog';
import * as Card from '../../../ui/card';
import TaskBadge from '../TaskBadge';
import EditTask from './EditTask';
import { TaskViewingMode } from '@/types/tasks';
import { differenceInDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Props {
    task: Task;
    handleDragStart: (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => void;
}

const f = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
});

const TaskComponent: FC<Props> = ({ task, handleDragStart }) => {
    const [open, setOpen] = React.useState(false);
    const [viewingMode, setViewingMode] =
        React.useState<TaskViewingMode>('view');

    return (
        <Dialog.Dialog open={open} onOpenChange={setOpen}>
            <Dialog.DialogTrigger
                asChild
                draggable
                aria-label="Task card component that triggers dialog and can be dragged"
            >
                <Card.Card
                    className={`cursor-pointer hover:bg-secondary transition-colors duration-300 ease-in-out relative max-w-sm mx-auto ${
                        task.isCompleted ? 'opacity-75 pointer-events-none' : ''
                    }`}
                    onClick={() => setOpen(true)}
                    aria-label="Task that can be either dragged or selected"
                    onDragStart={(e) => handleDragStart(e, task.id)}
                >
                    <Card.CardHeader>
                        <Card.CardTitle className="flex items-center gap-4">
                            <TaskBadge task={task} />
                            {task.title}
                            <Badge
                                className={`ml-auto tracking-wide ${
                                    task.priority === 1
                                        ? 'bg-emerald-700 hover:bg-emerald-800'
                                        : ''
                                }`}
                                variant={
                                    task.priority === 1
                                        ? 'default'
                                        : task.priority === 2
                                        ? 'default'
                                        : 'destructive'
                                }
                            >
                                {task.priority === 1
                                    ? 'Low'
                                    : task.priority === 2
                                    ? 'Medium'
                                    : 'High'}
                            </Badge>
                        </Card.CardTitle>
                    </Card.CardHeader>
                    <Card.CardContent>
                        <Card.CardDescription className="flex items-center justify-between w-full">
                            <span>{task.description}</span>
                            <span
                                className={`${
                                    differenceInDays(
                                        new Date(task.deadline),
                                        new Date()
                                    ) <= 7
                                        ? 'text-destructive'
                                        : ''
                                }`}
                            >
                                {f.format(task.deadline)}
                            </span>
                        </Card.CardDescription>
                    </Card.CardContent>
                </Card.Card>
            </Dialog.DialogTrigger>
            <EditTask
                task={task}
                setOpen={setOpen}
                viewingMode={viewingMode}
                setViewingMode={setViewingMode}
            />
        </Dialog.Dialog>
    );
};

export default TaskComponent;
