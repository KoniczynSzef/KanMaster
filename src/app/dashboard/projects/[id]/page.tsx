import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';
import Delete from './Delete';
import { getServerSession } from 'next-auth';
import { options } from '@/auth/options';
import { getUser } from '@/controllers/user-functions';
import KanbanBoard from '@/components/Board/KanbanBoard';
import { getTasks } from '@/controllers/task-actions';

interface Props {
    params: {
        id: string;
    };
}

const Page: FC<Props> = async ({ params }) => {
    const { id } = params;

    const session = await getServerSession(options);

    const user = await getUser(session?.user?.email);
    const project = await getProject(id);

    if (!project) {
        return <h3 className="font-bold text-2xl">Project not found!</h3>;
    }

    if (!user) {
        return <h3 className="font-bold text-2xl">User not found!</h3>;
    }

    const tasks = await getTasks(project.id);

    return (
        <div className="container mx-auto py-24">
            <KanbanBoard project={project} user={user} tasks={tasks} />

            <Delete project={project} user={user} />
        </div>
    );
};

export default Page;
