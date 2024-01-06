'use client';

import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/context/project-store';
import { useTaskStore } from '@/context/tasks-store';
import { deleteProject } from '@/controllers/project-functions';
import { deleteCompletedTasks } from '@/controllers/task-actions';
import { Project, Task, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {
    project: Project;
    user: User;
    tasks: Task[];
}

const Delete: FC<Props> = ({ project, user, tasks }) => {
    const router = useRouter();
    const { setProjects, projects } = useProjectStore();
    const { setTasks } = useTaskStore();

    const handleDelete = async () => {
        try {
            toast.info('Deleting project...');
            await deleteProject(project.id ?? '', user?.email);

            setProjects(projects.filter((p) => p.id !== project.id));

            toast.success('Project deleted!');
            return router.push('/dashboard');
        } catch (error) {
            toast.error('Something went wrong while deleting the project!');
        }
    };

    const handleDeleteCompleted = async () => {
        try {
            toast.info('Deleting completed tasks...');
            await deleteCompletedTasks(project.id);

            setTasks(tasks);

            toast.success('Completed tasks deleted!');
        } catch (error) {
            toast.error('Something went wrong while deleting the project!');
        }
    };

    return (
        <div className="flex justify-between w-full items-center">
            <Button
                variant={'destructive'}
                onClick={handleDelete}
                className="mt-36"
            >
                Delete project
            </Button>
            <Button
                variant={'destructive'}
                onClick={handleDeleteCompleted}
                className="mt-36"
            >
                Delete completed
            </Button>
        </div>
    );
};

export default Delete;
