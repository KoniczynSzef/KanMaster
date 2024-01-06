import React, { FC } from 'react';
import * as Dialog from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { completeTask, getTasks } from '@/controllers/task-actions';
import { toast } from 'sonner';
import { useTaskStore } from '@/context/tasks-store';
import { useProjectStore } from '@/context/project-store';
import { TaskViewingMode } from '@/types/tasks';
import { Input } from '@/components/ui/input';

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
    const TASK = { ...task };

    const { project } = useProjectStore();
    const { setTasks } = useTaskStore();
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

    const handleToggleViewingMode = () => {
        if (viewingMode === 'view') {
            setViewingMode('edit');
        } else {
            setViewingMode('view');
        }
    };

    return (
        <Dialog.DialogContent
            className={viewingMode === 'edit' ? 'bg-red-800' : ''}
        >
            <Dialog.DialogHeader>
                <Dialog.DialogTitle className="text-2xl font-bold">
                    {task.title}
                </Dialog.DialogTitle>
            </Dialog.DialogHeader>

            <Dialog.DialogDescription>
                {task.description}
            </Dialog.DialogDescription>

            <Dialog.DialogFooter className="flex justify-between items-center">
                <Button
                    variant={'secondary'}
                    onClick={handleToggleViewingMode}
                    className="mr-auto"
                >
                    {viewingMode === 'view' ? 'Edit' : 'Save'}
                </Button>
                <Button onClick={handleCompleteTask}>Complete task</Button>
            </Dialog.DialogFooter>
        </Dialog.DialogContent>
    );
};

export default EditTask;
