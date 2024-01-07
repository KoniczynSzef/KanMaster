import * as Card from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OmittedTask } from '@/types/tasks';
import Link from 'next/link';
import React, { FC } from 'react';
import Colors from './Colors';
import { BadgeColor } from '@/types/badge';
import TaskBadge from '../../tasks/TaskBadge';
import TaskPriority from './TaskPriority';

interface Props {
    Task: OmittedTask;
    setColor: React.Dispatch<React.SetStateAction<BadgeColor>>;
    setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
    priority: 1 | 2 | 3;
}

const f = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

const TaskPreview: FC<Props> = ({ Task, setColor, setPriority, priority }) => {
    return (
        <Card.Card>
            <Card.CardHeader>
                <Card.CardTitle className="flex items-center gap-4">
                    <TaskBadge task={Task} />
                    {Task.title}
                </Card.CardTitle>

                <Card.CardDescription>{Task.description}</Card.CardDescription>
            </Card.CardHeader>

            <Card.CardContent className="flex gap-8">
                <p className="text-muted-foreground text-sm">
                    {f.format(Task.deadline)}
                </p>
            </Card.CardContent>

            <ScrollArea className="h-24 border-y border-y-muted p-4">
                <div>
                    {Task.assignedPeopleEmails.map((email, i) => (
                        <Link
                            key={i}
                            role="link"
                            href={`/profile/${email}`}
                            className="text-blue-500 hover:underline"
                        >
                            {email}
                        </Link>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4">
                <h2 className="text-muted-foreground font-bold">
                    Select priority and mark color
                </h2>
                <TaskPriority setPriority={setPriority} priority={priority} />

                <Colors Task={Task} setColor={setColor} />
            </div>
        </Card.Card>
    );
};

export default TaskPreview;
