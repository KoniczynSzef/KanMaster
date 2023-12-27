import * as Card from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OmittedTask } from '@/types/tasks';
import React, { FC, useEffect } from 'react';

interface Props {
    Task: OmittedTask;
}

const f = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

const TaskPreview: FC<Props> = ({ Task }) => {
    useEffect(() => {
        console.log(Task);
    }, []);

    return (
        <Card.Card>
            <Card.CardHeader>
                <Card.CardTitle>{Task.title}</Card.CardTitle>
                <Card.CardDescription>{Task.description}</Card.CardDescription>
            </Card.CardHeader>
            <Card.CardContent className="flex gap-8">
                <p className="text-muted-foreground text-sm">
                    {f.format(Task.deadline)}
                </p>
            </Card.CardContent>

            <ScrollArea className="h-24 border-t border-t-muted p-4">
                <div>
                    {Task.assignedPeopleEmails.map((email, i) => (
                        <a
                            key={i}
                            role="link"
                            href={`mailto:${email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {email}
                        </a>
                    ))}
                </div>
            </ScrollArea>
        </Card.Card>
    );
};

export default TaskPreview;
