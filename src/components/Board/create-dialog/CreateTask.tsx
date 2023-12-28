import { Button } from '@/components/ui/button';
import * as Dialog from '@/components/ui/dialog';
import { OmittedTask, TaskSchema, TaskSchemaType } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeColors, Project } from '@prisma/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { toast } from 'sonner';
import { createTask } from '@/controllers/task-actions';
import { useTaskStore } from '@/context/tasks-store';

interface Props {
    project: Project;
}

const Task: OmittedTask = {
    projectId: 'placeholder',

    title: 'placeholder',
    description: 'placeholder',

    deadline: new Date(),
    markColor: 'blue',

    assignedPeopleEmails: [],
    category: 'todo',
    isCompleted: false,
};

const CreateTask: FC<Props> = ({ project }) => {
    const [deadline, setDeadline] = React.useState<Date>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [assignedUsers, setAssignedUsers] = React.useState<string[]>([]); // [email, email, email

    const [color, setColor] = React.useState<BadgeColors>('blue');

    const [submitting, setSubmitting] = React.useState(false);

    const { addTask } = useTaskStore();

    const form = useForm<TaskSchemaType>({
        mode: 'all',
        resolver: zodResolver(TaskSchema),
    });

    const handleSubmit = async (data: TaskSchemaType) => {
        if (step === 1) {
            Task.title = data.title;
            Task.description = data.description || null;
            Task.category = 'todo';

            setStep((prev) => prev + 1);
            return;
        } else if (step === 2) {
            if (assignedUsers.length === 0) {
                toast.error('Please assign task to at least one person.');
                return;
            }
            Task.assignedPeopleEmails = assignedUsers;
            Task.deadline =
                deadline ??
                new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);

            setStep((prev) => prev + 1);
            return;
        } else if (step === 3) {
            setSubmitting(true);
            Task.projectId = project.id;
            Task.markColor = color;

            const newTask = await createTask(project.id, Task);
            addTask(newTask);

            setSubmitting(false);

            toast.success('Task created successfully.');

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
                    <Dialog.DialogTitle>
                        {step === 1
                            ? 'Select Title and Description'
                            : step === 2
                            ? 'Assign task to people'
                            : 'Task Summary'}
                    </Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        {step === 1
                            ? 'Create title and description for new task.'
                            : step === 2
                            ? 'Select people you want to assign task to.'
                            : 'Create task'}{' '}
                        Step <span className="tPext-white">{step}</span> of 3.
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <TaskForm
                    form={form}
                    handleSubmit={handleSubmit}
                    step={step}
                    deadline={deadline}
                    setDeadline={setDeadline}
                    assignedUsers={assignedUsers}
                    setAssignedUsers={setAssignedUsers}
                    Task={Task}
                    submitting={submitting}
                    setColor={setColor}
                />
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
};

export default CreateTask;
