'use client';

import { useProjectStore } from '@/context/project-store';
import { ProjectBadge, type Project as ProjectType } from '@prisma/client';
import React, { FC, useEffect } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import { UserType } from '@/context/user-store';
import Skeletons from './Skeletons';
import NoProjectFound from './NoProjectFound';
import Project from './Project/Project';

interface Props {
    projects: ProjectType[];
    user: UserType | null;

    badges: ProjectBadge[];
}

const Projects: FC<Props> = ({ projects, badges }) => {
    const {
        setProjects,
        projects: state,
        hasLoaded,
        setHasLoaded,
        setBadges,
    } = useProjectStore();

    useEffect(() => {
        if (!hasLoaded) {
            setProjects(projects);
            setBadges(badges);

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

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
                            {state.map((project, idx) => (
                                <Project
                                    key={project.id}
                                    project={project}
                                    idx={idx}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </section>
    );
};

export default Projects;
