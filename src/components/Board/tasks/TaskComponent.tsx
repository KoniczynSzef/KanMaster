import { Task } from '@prisma/client';
import React, { FC } from 'react';
import * as Dialog from '../../ui/dialog';
import * as Card from '../../ui/card';
import { getBorder } from '@/helpers/badge-helpers';

interface Props {
    task: Task;
    handleDragStart: (
        e: React.DragEvent<HTMLDivElement>,
        taskId: string
    ) => void;
}

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
                    className={`${getBorder(task.markColor)} border`}
                    onClick={() => setOpen(true)}
                    aria-label="Task that can be either dragged or selected"
                    onDragStart={(e) => handleDragStart(e, task.id)}
                >
                    <Card.CardHeader>
                        <Card.CardTitle>{task.title}</Card.CardTitle>
                    </Card.CardHeader>
                    <Card.CardContent>
                        <Card.CardDescription>
                            {task.description}
                        </Card.CardDescription>
                    </Card.CardContent>
                </Card.Card>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent>
                <Dialog.DialogTitle>{task.title}</Dialog.DialogTitle>
                <Dialog.DialogDescription>
                    {task.description}
                </Dialog.DialogDescription>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
};

export default TaskComponent;
