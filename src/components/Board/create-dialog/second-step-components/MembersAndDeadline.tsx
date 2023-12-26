import { Label } from '@/components/ui/label';
import React, { FC } from 'react';
import TaskDatePicker from './TaskDatePicker';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TaskSecondStepSchema, TaskSecondStepSchemaType } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProjectStore } from '@/context/project-store';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserCard from './UserCard';

interface Props {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    assignedUsers: string[];
    setAssignedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const MembersAndDeadline: FC<Props> = (props) => {
    const { project } = useProjectStore();

    const form = useForm<TaskSecondStepSchemaType>({
        mode: 'all',
        resolver: zodResolver(TaskSecondStepSchema),
    });

    // const handleSubmit = (data: TaskSecondStepSchemaType) => {};

    return (
        <Form {...form}>
            <form className="flex flex-col gap-8">
                {project?.memberEmails.length === 0 ? (
                    <UserCard
                        yourself
                        index={0}
                        assignedUsers={props.assignedUsers}
                        setAssignedUsers={props.setAssignedUsers}
                    />
                ) : (
                    <ScrollArea className="h-72 grid gap-2 grid-cols-2 border border-muted p-4 rounded">
                        <ScrollBar orientation="vertical" />
                        {project?.memberEmails.map((email, i) => (
                            <UserCard
                                key={i}
                                yourself={false}
                                email={email}
                                index={i}
                                assignedUsers={props.assignedUsers}
                                setAssignedUsers={props.setAssignedUsers}
                            />
                        ))}
                    </ScrollArea>
                )}

                <div className="flex flex-col gap-2">
                    <Label htmlFor="Deadline">Set Deadline</Label>
                    <TaskDatePicker date={props.date} setDate={props.setDate} />
                </div>
            </form>
        </Form>
    );
};

export default MembersAndDeadline;
