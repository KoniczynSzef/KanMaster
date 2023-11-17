import { options } from '@/auth/options';
import Projects from '@/components/Dashboard/Projects';
import { getProjects } from '@/controllers/project-functions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/');
    }

    const projects = await getProjects(session?.user?.email);

    return (
        <div className="p-24 container">
            <Projects projects={projects} />
        </div>
    );
};

export default page;
