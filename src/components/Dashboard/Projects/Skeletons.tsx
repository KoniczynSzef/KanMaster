import React, { FC } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { Project } from '@prisma/client';

interface Props {
    projects: Project[];
}

const Skeletons: FC<Props> = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {projects.map((project) => (
                <Skeleton
                    key={project.id}
                    className="max-w-sm w-full h-48 rounded-3xl"
                />
            ))}
        </div>
    );
};

export default Skeletons;
