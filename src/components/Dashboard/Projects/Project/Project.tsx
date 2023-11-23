import { Button } from '@/components/ui/button';
import { projectType } from '@/context/project-store';
import {
    getBadgeColorClass,
    getBadgeIconComponent,
} from '@/helpers/badge-helpers';
import { ProjectBadge } from '@prisma/client';
import React, { FC } from 'react';

interface Props {
    project: projectType;
    badges: ProjectBadge[];
}

const Project: FC<Props> = ({ project, badges }) => {
    const [badge, setBadge] = React.useState<ProjectBadge | null>(null);

    React.useEffect(() => {
        const badge = badges.find((badge) => badge.projectId === project.id);

        console.log(badge);

        if (badge) {
            setBadge(badge);
        }
    }, []);

    const icon = badge && getBadgeIconComponent(badge.icon);

    return (
        <div className="max-w-sm p-8 rounded border border-slate-800 relative h-32 w-full">
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="text-sm mt-4">{project.description}</p>

            {badge && (
                <Button
                    size={'icon'}
                    className={`${getBadgeColorClass(
                        badge.color
                    )} absolute -top-4 -left-4 pointer-events-none`}
                >
                    {icon}
                </Button>
            )}
        </div>
    );
};

export default Project;
