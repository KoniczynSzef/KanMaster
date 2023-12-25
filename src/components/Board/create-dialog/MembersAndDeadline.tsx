import { Label } from '@/components/ui/label';
import React, { FC } from 'react';
import TaskDatePicker from './TaskDatePicker';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TaskSecondStepSchema, TaskSecondStepSchemaType } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const MembersAndDeadline: FC<Props> = (props) => {
    const form = useForm<TaskSecondStepSchemaType>({
        mode: 'all',
        resolver: zodResolver(TaskSecondStepSchema),
    });

    return (
        <Form {...form}>
            <div className="flex flex-col mt-4">
                <Label htmlFor="Deadline">Set Deadline</Label>
                <TaskDatePicker date={props.date} setDate={props.setDate} />
            </div>
        </Form>
    );
};

export default MembersAndDeadline;
