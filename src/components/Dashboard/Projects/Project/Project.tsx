import { projectType, useProjectStore } from '@/context/project-store';
import React, { FC } from 'react';
import ProjectBadge from '../Badge';

import { motion } from 'framer-motion';
import { User } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

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
                className={
                    'md:max-w-sm lg:max-w-md rounded-3xl border border-muted relative h-48 w-full origin-center group-hover:border-violet-300 dark:group-hover:border-primary dark:group-hover:shadow-primary group-hover:shadow-violet-300 group-hover:shadow-lg transition duration-300 p-2'
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 * idx }}
            >
                <Card className="h-full rounded-3xl border-none shadow-none">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>{project.name}</CardTitle>
                        <Badge
                            className={`${
                                isLeader
                                    ? 'from-paletteVioletMain to-paletteDarkerIndigo'
                                    : 'from-paletteAmber to-paletteLighterRed'
                            } bg-gradient-to-r pointer-events-none `}
                        >
                            {isLeader ? 'Leader' : 'Member'}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <ProjectBadge withId badge={badge} withoutAnimation />
                </Card>
            </motion.div>
        </Link>
    );
};

export default Project;
