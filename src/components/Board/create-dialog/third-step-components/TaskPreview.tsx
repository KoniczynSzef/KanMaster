import * as Card from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OmittedTask } from '@/types/tasks';
import Link from 'next/link';
import React, { FC } from 'react';
import Colors from './Colors';
import { BadgeColor } from '@/types/badge';
import { getBorder } from '@/helpers/badge-helpers';

interface Props {
    Task: OmittedTask;
    setColor: React.Dispatch<React.SetStateAction<BadgeColor>>;
}

const f = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});

const TaskPreview: FC<Props> = ({ Task, setColor }) => {
    const [borderColor, setBorderColor] = React.useState<BadgeColor>('blue');

    return (
        <Card.Card className={`${getBorder(borderColor)}`}>
            <Card.CardHeader>
                <Card.CardTitle>{Task.title}</Card.CardTitle>
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

            <Colors
                setBorderColor={setBorderColor}
                Task={Task}
                setColor={setColor}
            />
        </Card.Card>
    );
};

export default TaskPreview;
