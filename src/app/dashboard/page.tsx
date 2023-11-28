import { options } from '@/auth/options';
import LoadMore from '@/components/Dashboard/Projects/LoadMore';
import Projects from '@/components/Dashboard/Projects/Projects';
import {
    getProjects,
    getProjectsLength,
} from '@/controllers/project-functions';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const DashboardPage: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/');
    }

    if (!session.user) {
        return redirect('/');
    }

    const projects = await getProjects(session?.user?.email, 1);
    const length = await getProjectsLength(session?.user?.email);

    const badgesArr = await db.projectBadge.findMany();
    return (
        <div className="container relative mx-auto py-24 flex flex-col gap-12">
            <Projects
                projects={projects}
                user={session.user}
                badges={badgesArr}
            />

            <LoadMore
                length={length}
                session={session}
                className="self-end transition"
            />
        </div>
    );
};

export default DashboardPage;
