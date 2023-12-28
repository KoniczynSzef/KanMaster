import { Task } from '@prisma/client';
import React, { FC } from 'react';
import * as Dialog from '../ui/dialog';
import * as Card from '../ui/card';
import { getBorder } from '@/helpers/badge-helpers';

interface Props {
    task: Task;
}

const TaskComponent: FC<Props> = ({ task }) => {
    return (
        <Dialog.Dialog>
            <Dialog.DialogTrigger
                asChild
                draggable
                aria-label="Task card component that triggers dialog"
            >
                <Card.Card>
                    <Card.CardHeader>
                        <Card.CardTitle
                            className={`${getBorder(task.markColor)}`}
                        >
                            {task.title}
                        </Card.CardTitle>
                    </Card.CardHeader>
                    <Card.CardContent>
                        <Card.CardDescription>
                            {task.description}
                        </Card.CardDescription>
                    </Card.CardContent>
                </Card.Card>
            </Dialog.DialogTrigger>
        </Dialog.Dialog>
    );
};

export default TaskComponent;
