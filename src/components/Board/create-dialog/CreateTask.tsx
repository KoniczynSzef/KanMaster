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
import { Plus } from 'lucide-react';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';

interface Props {
    project: Project;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<void, unknown>>;
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
    priority: 1,
};

const CreateTask: FC<Props> = ({ project, refetch }) => {
    const [deadline, setDeadline] = React.useState<Date>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [assignedUsers, setAssignedUsers] = React.useState<string[]>([]);

    const [priority, setPriority] = React.useState<1 | 2 | 3>(1);

    const [color, setColor] = React.useState<BadgeColors>('blue');

    const [submitting, setSubmitting] = React.useState(false);

    const { addTask, getTaskCount } = useTaskStore();

    const form = useForm<TaskSchemaType>({
        mode: 'all',
        resolver: zodResolver(TaskSchema),
    });

    const resetState = () => {
        setOpenDialog(false);
        setSubmitting(false);

        setStep(1);
        setDeadline(undefined);

        setAssignedUsers([]);
        setColor('blue');
    };

    const handleCheckForProjectsCount = () => {
        if (getTaskCount() >= 25) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (data: TaskSchemaType) => {
        if (step === 1) {
            Task.title = data.title;
            Task.description = data.description || null;
            Task.category = 'todo';

            setStep((prev) => (prev += 1));
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

            setStep((prev) => (prev += 1));
            return;
        } else if (step === 3) {
            const canCreate = handleCheckForProjectsCount();

            if (!canCreate) {
                toast.error('You can only create 25 tasks per project.');
                return;
            }

            setSubmitting(true);
            Task.projectId = project.id;
            Task.markColor = color;
            Task.priority = priority;

            const newTask = await createTask(project.id, Task);
            addTask(newTask);

            toast.success('Task created successfully.');

            resetState();

            await refetch();
            return;
        }
    };

    return (
        <Dialog.Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <Dialog.DialogTrigger asChild>
                <Button className="mt-4 ml-[23rem]" size={'icon'}>
                    <Plus />
                </Button>
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
                    setPriority={setPriority}
                    priority={priority}
                />
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
};

export default CreateTask;
