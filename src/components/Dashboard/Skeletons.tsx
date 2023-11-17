import React, { FC } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Project } from '@prisma/client';

interface Props {
    projects: Project[];
}

const Skeletons: FC<Props> = ({ projects }) => {
    return projects.map((project) => (
        <Skeleton key={project.id} className="max-w-sm w-full h-24" />
    ));
};

export default Skeletons;
