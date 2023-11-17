'use client';

import { useProjectStore } from '@/context/project-store';
import { Project } from '@prisma/client';
import React, { FC, useEffect } from 'react';
import SearchPanel from './SearchPanel';
import { UserType, useUserStore } from '@/context/user-store';
import Skeletons from './Skeletons';
import NoProjectFound from './NoProjectFound';

interface Props {
    projects: Project[];
    user: UserType | null;
}

const Projects: FC<Props> = ({ projects, user }) => {
    const { setUser } = useUserStore();
    const {
        setProjects,
        projects: state,
        hasLoaded,
        setHasLoaded,
    } = useProjectStore();

    useEffect(() => {
        setProjects(projects);

        if (user) {
            setUser(user);
        }

        setHasLoaded(true);
    }, []);

    return (
        <section>
            <SearchPanel projects={projects} />

            <section className="mt-12">
                {!hasLoaded && <Skeletons projects={projects} />}

                {hasLoaded && (
                    <>
                        {projects.length > 0 && state.length === 0 && (
                            <NoProjectFound />
                        )}

                        {state.map((project) => (
                            <div
                                key={project.id}
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
                    </>
                )}
            </section>
        </section>
    );
};

export default Projects;
