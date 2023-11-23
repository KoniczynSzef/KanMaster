import { Button } from '@/components/ui/button';
import { projectType } from '@/context/project-store';
import { getBadgeColor, getBadgeIconComponent } from '@/helpers/badge-helpers';
import { ProjectBadge } from '@prisma/client';
import React, { FC } from 'react';

interface Props {
    project: projectType;
    badge: ProjectBadge;
}

const Project: FC<Props> = ({ project, badge }) => {
    console.log(badge);

    return (
        <div className="max-w-sm p-8 rounded border border-slate-800 relative h-32 w-72">
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm mt-4">{project.description}</p>

            {badge && (
                <Button
                    size={'icon'}
                    className={`${getBadgeColor(
                        badge.color
                    )} absolute -top-4 -left-4`}
                >
                    {getBadgeIconComponent(badge.icon)}
                </Button>
            )}
        </div>
    );
};

export default Project;
