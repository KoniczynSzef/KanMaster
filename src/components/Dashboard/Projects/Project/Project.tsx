import { projectType, useProjectStore } from '@/context/project-store';
import React, { FC } from 'react';
import ProjectBadge from '../Badge';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { deleteProject } from '@/controllers/project-functions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
    project: projectType;
    idx: number;
    user: User;
    isLeader: boolean;
}

const Project: FC<Props> = ({ project, idx, user, isLeader }) => {
    const router = useRouter();
    const { badges, setProjects, projects } = useProjectStore();
    const badge = badges.find((badge) => badge.projectId === project.id);

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
        <Link
            href={`/dashboard/projects/${project.id}`}
            className="group relative"
        >
            <motion.div
                className="md:max-w-sm lg:max-w-md p-8 rounded border border-muted relative h-32 w-full origin-center flex justify-between items-start group-hover:bg-muted transition duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 * idx }}
            >
                <Button
                    variant={'destructive'}
                    size={'icon'}
                    className="absolute right-0 top-0"
                    onClick={handleDelete}
                >
                    <X />
                </Button>

                <ProjectBadge withId badge={badge} withoutAnimation />
                <div className="flex-col">
                    <h3 className="text-3xl font-bold">{project.name}</h3>
                    <p className="text-sm mt-4 text-muted-foreground">
                        {project.description}
                    </p>
                </div>
                <Badge
                    className={`${
                        isLeader ? 'bg-paletteVioletMain' : 'bg-paletteAmber'
                    } pointer-events-none `}
                >
                    {isLeader ? 'Leader' : 'Member'}
                </Badge>
            </motion.div>
        </Link>
    );
};

export default Project;
