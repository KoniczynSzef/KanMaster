import EditProjectForm from '@/components/Settings/EditProjectForm';
import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';

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

    return (
        <div className="border border-muted px-16 py-8 rounded w-full">
            {/* <code>
                <pre>{JSON.stringify(project, null, 2)}</pre>
            </code> */}
            <h2 className="text-2xl font-bold">Edit Project: {project.name}</h2>
            <EditProjectForm project={project} className="mt-16" />
        </div>
    );
};

export default page;
