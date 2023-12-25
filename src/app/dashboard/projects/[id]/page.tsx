import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';
import Delete from './Delete';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import { getUser } from '@/controllers/user-functions';
import KanbanBoard from '@/components/Board/KanbanBoard';

interface Props {
    params: {
        id: string;
    };
}

const Page: FC<Props> = async ({ params }) => {
    const { id } = params;
    const project = await getProject(id);

    const session = await getServerSession(options);

    const user = await getUser(session?.user?.email);

    if (!project) {
        return <h3 className="font-bold text-2xl">Project not found!</h3>;
    }

    if (!user) {
        return <h3 className="font-bold text-2xl">User not found!</h3>;
    }

    return (
        <div className="container mx-auto py-24">
            {/* <pre className="border border-muted rounded p-4">
                {JSON.stringify(project, null, 2)}
            </pre> */}

            <KanbanBoard project={project} user={user} />

            <Delete project={project} user={user} />
        </div>
    );
};

export default Page;
