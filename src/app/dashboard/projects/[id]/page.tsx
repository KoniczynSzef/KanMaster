import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';

interface Props {
    params: {
        id: string;
    };
}

const page: FC<Props> = async ({ params }) => {
    const { id } = params;
    const project = await getProject(id);

    return <div>{project?.name}</div>;
};

export default page;
