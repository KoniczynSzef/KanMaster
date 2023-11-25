import { Button } from '@/components/ui/button';
import { Badge as BadgeType } from '@/context/project-form-store';
import {
    getBadgeColorClass,
    getBadgeIconComponent,
} from '@/helpers/badge-helpers';
import { ProjectBadge } from '@prisma/client';
import React, { FC } from 'react';

type Props = {
    withoutAnimation?: boolean;
} & (
    | {
          withId: true;
          badge: ProjectBadge | undefined;
      }
    | {
          withId: false;
          badge: BadgeType | undefined;
      }
);

const Badge: FC<Props> = ({ badge, withoutAnimation, withId }) => {
    return (
        badge && (
            <Button
                size={'icon'}
                className={`${
                    withId ? getBadgeColorClass(badge.color) : badge.color
                } ${
                    withId
                        ? 'absolute -top-4 -left-4 pointer-events-none'
                        : 'pointer-events-none'
                } ${withoutAnimation && 'transition-none'}`}
            >
                {getBadgeIconComponent(badge.icon)}
            </Button>
        )
    );
};

export default Badge;
