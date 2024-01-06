import React, { FC } from 'react';
import * as Dialog from '@/components/ui/dialog';
import { Task } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { completeTask, getTasks } from '@/controllers/task-actions';
import { toast } from 'sonner';
import { useTaskStore } from '@/context/tasks-store';
import { useProjectStore } from '@/context/project-store';

interface Props {
    task: Task;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask: FC<Props> = ({ task, setOpen }) => {
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
    return (
        <Dialog.DialogContent>
            <Dialog.DialogHeader>
                <Dialog.DialogTitle className="text-2xl font-bold">
                    {task.title}
                </Dialog.DialogTitle>
            </Dialog.DialogHeader>

            <Dialog.DialogDescription>
                {task.description}
            </Dialog.DialogDescription>

            <Dialog.DialogFooter className="flex justify-between items-center">
                <Link href={`${task.id}/edit`} className="mr-auto">
                    <Button variant={'secondary'}>Edit task</Button>
                </Link>
                <Button onClick={handleCompleteTask}>Complete task</Button>
            </Dialog.DialogFooter>
        </Dialog.DialogContent>
    );
};

export default EditTask;
