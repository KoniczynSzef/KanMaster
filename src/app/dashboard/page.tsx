import { options } from '@/auth/options';
import LoadMore from '@/components/Dashboard/Projects/LoadMore';
import Projects from '@/components/Dashboard/Projects/Projects';
import { getBadges } from '@/controllers/badge-functions';
// import { getNotifications } from '@/controllers/notification-functions';
import {
    getProjects,
    getProjectsLength,
} from '@/controllers/project-functions';
import { getUser } from '@/controllers/user-functions';
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
    console.log(projects);

    const length = await getProjectsLength(session?.user?.email);

    const badgesArr = await getBadges(session?.user?.email);
    const user = await getUser(session?.user?.email);

    // const notifications = await getNotifications(session.user.email, false);
    // console.log(notifications);

    return (
        <div className="container relative mx-auto py-24 flex flex-col gap-12">
            <Projects projects={projects} user={user} badges={badgesArr} />

            <LoadMore length={length} session={session} user={user} />
        </div>
    );
};

export default DashboardPage;
