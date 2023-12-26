import { Label } from '@/components/ui/label';
import React, { FC } from 'react';
import TaskDatePicker from './TaskDatePicker';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TaskSecondStepSchema, TaskSecondStepSchemaType } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProjectStore } from '@/context/project-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserCard from './UserCard';

interface Props {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const MembersAndDeadline: FC<Props> = (props) => {
    const [assignedUsers, setAssignedUsers] = React.useState<string[]>([]); // [email, email, email
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
                        assignedUsers={assignedUsers}
                        setAssignedUsers={setAssignedUsers}
                    />
                ) : (
                    <ScrollArea className="grid gap-2">
                        {project?.memberEmails.map((email, i) => (
                            <UserCard
                                key={i}
                                yourself={false}
                                email={email}
                                index={i}
                                assignedUsers={assignedUsers}
                                setAssignedUsers={setAssignedUsers}
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
