import { options } from '@/auth/options';
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
        <div className="p-24">
            <h3 className="text-3xl font-bold">Dashboard Page</h3>
            <pre className="mt-6">{JSON.stringify(session.user)}</pre>

            {projects.map((project) => (
                <div
                    key={project.id}
                    className="mt-6 max-w-sm p-4 rounded border border-muted-foreground"
                >
                    <h3 className="text-3xl font-bold">{project.name}</h3>
                    <p className="text-sm mt-4">{project.description}</p>
                </div>
            ))}
        </div>
    );
};

export default page;
