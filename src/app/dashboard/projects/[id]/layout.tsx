import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import { getProject } from '@/controllers/project-functions';
import React, { FC } from 'react';

interface Props {
    children: React.ReactNode;
    params: {
        id: string;
    };
}

const layout: FC<Props> = async (props) => {
    const { id } = props.params;
    const project = await getProject(id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <section className="flex rounded p-4 gap-4 my-24 mx-16 relative">
            <Sidebar project={project} />
            {props.children}
        </section>
    );
};

export default layout;
