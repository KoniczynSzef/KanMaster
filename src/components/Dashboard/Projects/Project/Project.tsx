import { projectType } from '@/context/project-store';
import React, { FC } from 'react';

interface Props {
    project: projectType;
}

const Project: FC<Props> = ({ project }) => {
    return (
        <div className="max-w-sm p-8 rounded border border-slate-800 relative h-32 w-full">
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm mt-4">{project.description}</p>
        </div>
    );
};

export default Project;
