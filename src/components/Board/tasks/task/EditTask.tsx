import React, { FC, useState } from 'react';
import * as Dialog from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { completeTask, getTasks, updateTask } from '@/controllers/task-actions';
import { toast } from 'sonner';
import { useTaskStore } from '@/context/tasks-store';
import { useProjectStore } from '@/context/project-store';
import { TaskEditionSchemaType, TaskViewingMode } from '@/types/tasks';
import EditForm from './EditForm';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import EditFormFooter from './EditFormFooter';

interface Props {
    task: Task;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    viewingMode: TaskViewingMode;
    setViewingMode: React.Dispatch<React.SetStateAction<TaskViewingMode>>;
}

const EditTask: FC<Props> = ({
    task,
    setOpen,
    viewingMode,
    setViewingMode,
}) => {
    const [TASK, setTASK] = useState<Task>(task);

    const form = useForm<TaskEditionSchemaType>({
        defaultValues: {
            title: TASK.title,
            description: TASK.description ?? '',
            assignedPeopleEmails: TASK.assignedPeopleEmails,
            deadline: TASK.deadline,
        },
    });

    const { project } = useProjectStore();
    const { setTasks, updateTask: updateTaskSync } = useTaskStore();
    const handleCompleteTask = async () => {
        try {
            await completeTask(task.id);
            toast.success('Task completed!');

            if (!project) {
                throw new Error('Project not found');
            }

            const tasks = await getTasks(project.id);
            setTasks(tasks);

            setOpen(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const handleSubmit = async (data: TaskEditionSchemaType) => {
        if (viewingMode === 'view') {
            setViewingMode('edit');
            return;
        }

        try {
            const newTask = await updateTask(task.id, data);
            updateTaskSync(task.id, newTask);

            toast.success('Task updated!');
            setOpen(false);
        } catch (error) {
            toast.error("Couldn't update task");
        }

        setViewingMode('view');
    };

    return (
        <Dialog.DialogContent>
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
                    {viewingMode === 'edit' ? (
                        <EditForm TASK={TASK} setTASK={setTASK} form={form} />
                    ) : (
                        <>
                            <Dialog.DialogHeader>
                                <Dialog.DialogTitle className="text-2xl font-bold">
                                    {task.title}
                                </Dialog.DialogTitle>
                            </Dialog.DialogHeader>

                            <Dialog.DialogDescription>
                                {task.description}
                            </Dialog.DialogDescription>
                        </>
                    )}

                    <EditFormFooter
                        handleCompleteTask={handleCompleteTask}
                        viewingMode={viewingMode}
                    />
                </form>
            </Form>
        </Dialog.DialogContent>
    );
};

export default EditTask;
