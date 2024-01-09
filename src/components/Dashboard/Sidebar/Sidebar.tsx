import { Project } from '@prisma/client';
import React, { FC } from 'react';
import { sidebarLinks } from '@/assets/sidebar-links';
import SidebarLink from './SidebarLink';

interface Props {
    project: Project;
}

const Sidebar: FC<Props> = (props) => {
    return (
        <div className="w-72">
            {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} project={props.project} />
            ))}
        </div>
    );
};

export default Sidebar;
