import { Button } from '@/components/ui/button';
import * as Dialog from '@/components/ui/dialog';
import { TaskSchema, TaskSchemaType } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import MembersAndDeadline from './MembersAndDeadline';

interface Props {
    createTask: () => void;
}

const Task: Task = {
    id: 'placeholder',
    projectId: 'placeholder',

    title: 'placeholder',
    description: 'placeholder',

    deadline: new Date(),
    createdAt: new Date(),

    assignedPeopleEmails: [],
    category: 'todo',
    isCompleted: false,
};

const CreateTask: FC<Props> = () => {
    const [deadline, setDeadline] = React.useState<Date>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [step, setStep] = React.useState(1);

    const form = useForm<TaskSchemaType>({
        mode: 'all',
        resolver: zodResolver(TaskSchema),
    });

    const handleSubmit = (data: TaskSchemaType) => {
        if (step === 1) {
            Task.title = data.title;
            Task.description = data.description || null;
            Task.category = 'todo';

            setStep((prev) => prev + 1);
            return;
        } else if (step === 2) {
            // Task.assignedPeopleEmails = data.assignedPeopleEmails;
            Task.deadline =
                deadline ??
                new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
            setStep((prev) => prev + 1);
            return;
        } else if (step === 3) {
            console.log('submitting');
            setOpenDialog(false);
            return;
        }
    };

    return (
        <Dialog.Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.DialogTrigger asChild>
                <Button className="ml-auto">+</Button>
            </Dialog.DialogTrigger>

            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>Create Task</Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Create a new task for this project. Step {step} of 3.
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                {step === 1 ? (
                    <TaskForm form={form} handleSubmit={handleSubmit} />
                ) : null}

                {step === 2 ? (
                    <MembersAndDeadline date={deadline} setDate={setDeadline} />
                ) : null}
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
};

export default CreateTask;
