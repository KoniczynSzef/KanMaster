'use client';

import { useProjectStore } from '@/context/project-store';
import { Project } from '@prisma/client';
import React, { FC, useEffect } from 'react';
import SearchPanel from './SearchPanel';

interface Props {
    projects: Project[];
}

const Projects: FC<Props> = ({ projects }) => {
    const { setProjects, projects: contextProjects } = useProjectStore();

    useEffect(() => {
        setProjects(projects);
    }, []);

    return (
        <section>
            <SearchPanel projects={projects} />

            {projects.length > 0 && contextProjects.length === 0 && (
                <div>
                    <h3 className="text-2xl font-bold mt-4">
                        No projects found
                    </h3>
                </div>
            )}

            {contextProjects.map((project) => (
                <div
                    key={project.id}
                    className="mt-6 max-w-sm p-4 rounded border border-slate-800"
                >
                    <h3 className="text-3xl font-bold">{project.name}</h3>
                    <p className="text-sm mt-4">{project.description}</p>
                </div>
            ))}
        </section>
    );
};

export default Projects;
