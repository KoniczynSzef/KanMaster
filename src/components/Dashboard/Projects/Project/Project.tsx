import { projectType } from '@/context/project-store';
import React, { FC } from 'react';
import Badge from '../../Badge';

interface Props {
    project: projectType;
}

const Project: FC<Props> = ({ project }) => {
    return (
        <div className="md:max-w-sm lg:max-w-md p-8 rounded border border-slate-800 relative h-32 w-full">
            <Badge project={project} />
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm mt-4">{project.description}</p>
        </div>
    );
};

export default Project;
