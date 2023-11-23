import { Button } from '@/components/ui/button';
import { projectType } from '@/context/project-store';
import {
    getBadgeColorClass,
    getBadgeIconComponent,
} from '@/helpers/badge-helpers';
import { ProjectBadge } from '@prisma/client';
import React, { FC, useEffect } from 'react';

interface Props {
    project: projectType;
    badges: ProjectBadge[];
}

const Badge: FC<Props> = ({ project, badges }) => {
    const [badge, setBadge] = React.useState<ProjectBadge | null>(
        badges.find((badge) => badge.projectId === project.id) ?? null
    );

    useEffect(() => {
        setBadge(
            badges.find((badge) => badge.projectId === project.id) ?? null
        );
    }, [badges]);

    return (
        badge && (
            <Button
                size={'icon'}
                className={`${getBadgeColorClass(
                    badge.color
                )} absolute -top-4 -left-4 pointer-events-none`}
            >
                {getBadgeIconComponent(badge.icon)}
            </Button>
        )
    );
};

export default Badge;
