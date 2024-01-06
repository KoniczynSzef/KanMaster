import { Task } from '@prisma/client';
import React, { FC } from 'react';
import * as Dialog from '../../../ui/dialog';
import * as Card from '../../../ui/card';
import TaskBadge from '../TaskBadge';
import EditTask from './EditTask';

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

    return (
        <Dialog.Dialog open={open} onOpenChange={setOpen}>
            <Dialog.DialogTrigger
                asChild
                draggable
                aria-label="Task card component that triggers dialog"
            >
                <Card.Card
                    className={`cursor-pointer hover:bg-secondary transition-colors duration-300 ease-in-out relative ${
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
                        </Card.CardTitle>
                    </Card.CardHeader>
                    <Card.CardContent>
                        <Card.CardDescription className="flex items-center justify-between w-full">
                            <span>{task.description}</span>
                            <span className="text-destructive">
                                {f.format(task.deadline)}
                            </span>
                        </Card.CardDescription>
                    </Card.CardContent>
                </Card.Card>
            </Dialog.DialogTrigger>
            <EditTask task={task} setOpen={setOpen} />
        </Dialog.Dialog>
    );
};

export default TaskComponent;
