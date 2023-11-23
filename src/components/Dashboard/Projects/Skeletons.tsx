import React, { FC } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Project } from '@prisma/client';

interface Props {
    projects: Project[];
}

const Skeletons: FC<Props> = ({ projects }) => {
    return (
        <div className="grid grid-cols-3">
            {projects.map((project) => (
                <Skeleton key={project.id} className="max-w-sm w-full h-32" />
            ))}
        </div>
    );
};

export default Skeletons;
