'use client';

import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/context/project-store';
import { deleteProject } from '@/controllers/project-functions';
import { Project, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {
    project: Project;
    user: User;
}

const Delete: FC<Props> = ({ project, user }) => {
    const router = useRouter();
    const { setProjects, projects } = useProjectStore();
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

    return (
        <Button variant={'destructive'} onClick={handleDelete}>
            Delete project
        </Button>
    );
};

export default Delete;
