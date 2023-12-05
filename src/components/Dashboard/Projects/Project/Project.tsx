import { projectType, useProjectStore } from '@/context/project-store';
import React, { FC } from 'react';
import ProjectBadge from '../Badge';

import { motion } from 'framer-motion';
import { User } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Props {
    project: projectType;
    idx: number;
    user: User;
    isLeader: boolean;
}

const Project: FC<Props> = ({ project, idx, isLeader }) => {
    const { badges } = useProjectStore();
    const badge = badges.find((badge) => badge.projectId === project.id);

    return (
        <Link
            href={`/dashboard/projects/${project.id}`}
            className="group relative"
        >
            <motion.div
                className="md:max-w-sm lg:max-w-md p-8 rounded-3xl border border-muted relative h-48 w-full origin-center flex justify-between items-start group-hover:border-violet-300 dark:group-hover:border-primary dark:group-hover:shadow-primary group-hover:shadow-violet-300 group-hover:shadow-lg transition duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 * idx }}
            >
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
