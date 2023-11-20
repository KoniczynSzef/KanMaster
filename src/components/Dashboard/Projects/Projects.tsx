'use client';

import { useProjectStore } from '@/context/project-store';
import { Project } from '@prisma/client';
import React, { FC, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import { UserType } from '@/context/user-store';
import Skeletons from './Skeletons';
import NoProjectFound from './NoProjectFound';

interface Props {
    projects: Project[];
    user: UserType | null;
}

const Projects: FC<Props> = ({ projects }) => {
    const {
        setProjects,
        projects: state,
        hasLoaded,
        setHasLoaded,
    } = useProjectStore();

    useEffect(() => {
        if (!hasLoaded) {
            setProjects(projects);
            setHasLoaded(true);
        } else {
            setProjects(state);
        }
    }, []);

    return (
        <section>
            <SearchPanel projects={projects} />

            <section className="mt-12">
                {projects.length === 0 && state.length === 0 && (
                    <NoProjectFound customLabel="Currently you don't have any projects." />
                )}

                {!hasLoaded && <Skeletons projects={projects} />}

                {hasLoaded && (
                    <>
                        {projects.length > 0 && state.length === 0 && (
                            <NoProjectFound />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {state.map((project, idx) => (
                                <div
                                    key={idx}
                                    className="max-w-sm p-4 rounded border border-slate-800"
                                >
                                    <h3 className="text-3xl font-bold">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm mt-4">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </section>
    );
};

export default Projects;
