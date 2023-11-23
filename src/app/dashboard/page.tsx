import { options } from '@/auth/options';
import Projects from '@/components/Dashboard/Projects/Projects';
import { getProjects } from '@/controllers/project-functions';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/');
    }

    if (!session.user) {
        return redirect('/');
    }

    const projects = await getProjects(session?.user?.email);

    const badgesArr = await db.projectBadge.findMany();

    console.log(badgesArr);

    return (
        <div className="container relative mx-auto py-24">
            <Projects
                projects={projects}
                user={session.user}
                badges={badgesArr}
            />
        </div>
    );
};

export default page;
