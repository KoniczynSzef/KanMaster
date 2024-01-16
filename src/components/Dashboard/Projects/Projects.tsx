'use client';

import { useProjectStore } from '@/context/project-store';
import {
    ProjectBadge,
    User,
    type Project as ProjectType,
} from '@prisma/client';
import React, { FC } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import { useUserStore } from '@/context/user-store';
import Skeletons from './Skeletons';
import NoProjectFound from './NoProjectFound';
import Project from './Project/Project';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from 'react-query';
import { getProjects } from '@/controllers/project-functions';

interface Props {
    projects: ProjectType[];
    user: User;

    badges: ProjectBadge[];
}

const Projects: FC<Props> = ({ projects, badges, user }) => {
    const [projectList] = useAutoAnimate();
    const { setUser } = useUserStore();
    const { setProjects, projects: state, setBadges } = useProjectStore();

    const { isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const p = await getProjects(user.email, 1);
            setProjects(p);

            setUser(user);
            setBadges(badges);
            return p;
        },
    });

    return (
        <section>
            <SearchPanel projects={projects} />

            <section className="mt-12">
                {projects.length === 0 && state.length === 0 && (
                    <NoProjectFound customLabel="Currently you don't have any projects." />
                )}

                {isLoading ? (
                    <Skeletons projects={projects} />
                ) : (
                    <>
                        {projects.length > 0 && state.length === 0 && (
                            <NoProjectFound />
                        )}

                        <ul
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-y-16 px-4"
                            ref={projectList}
                        >
                            {state.map((project, idx) => (
                                <Project
                                    user={user}
                                    key={idx}
                                    project={project}
                                    idx={idx}
                                    isLeader={project.teamLeaderId === user.id}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </section>
        </section>
    );
};

export default Projects;
