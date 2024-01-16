import EditProjectForm from '@/components/Settings/EditProjectForm';
import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';
import Badge from '@/components/Dashboard/Projects/Badge';
import { getBadge } from '@/controllers/badge-functions';

interface Props {
    params: {
        id: string;
    };
}

const page: FC<Props> = async ({ params }) => {
    const project = await getProject(params.id);

    if (!project) {
        return <div>Project not found</div>;
    }

    const badge = await getBadge(project?.id);

    return (
        <div className="border border-muted px-16 py-8 rounded w-full">
            {/* <code>
                <pre>{JSON.stringify(project, null, 2)}</pre>
            </code> */}
            <div className="relative flex items-center gap-8">
                <h2 className="text-2xl font-bold">
                    Edit Project: {project.name}
                </h2>
                {badge && <Badge badge={badge} withId className="static" />}
            </div>
            <EditProjectForm project={project} className="mt-16" />
        </div>
    );
};

export default page;
