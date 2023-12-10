import { projectType, useProjectStore } from '@/context/project-store';
import React, { FC } from 'react';
import ProjectBadge from '../Badge';

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

const Project: FC<Props> = ({ project, isLeader }) => {
    const { badges } = useProjectStore();
    const badge = badges.find((badge) => badge.projectId === project.id);

    return (
        <Link
            href={`/dashboard/projects/${project.id}`}
            className="group relative"
        >
            <Card className="rounded-3xl h-48 group-hover:shadow-violet-400 group-hover:border-violet-400 dark:group-hover:shadow-primary dark:group-hover:border-primary transition-all duration-300">
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
        </Link>
    );
};

export default Project;
