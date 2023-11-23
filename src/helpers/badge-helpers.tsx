import { getBadge } from '@/controllers/badge-functions';
import { BadgeColor, BadgeIcon } from '@/types/badge';
import { Project, ProjectBadge } from '@prisma/client';
import { Book, Calendar, Heart, Laptop, Users, Wrench } from 'lucide-react';

import React from 'react';

export function getBadgeColor(color: string): BadgeColor {
    switch (color) {
        case 'bg-paletteBlue':
            return 'blue';
        case 'bg-paletteGreen':
            return 'green';
        case 'bg-paletteAmber':
            return 'orange';
        case 'bg-paletteLighterRed':
            return 'red';
        case 'bg-paletteGrey':
            return 'grey';
        case 'bg-paletteDarkerIndigo':
            return 'indigo';

        default:
            return 'red';
    }
}

export function getBadgeColorClass(color: BadgeColor): string {
    switch (color) {
        case 'blue':
            return 'bg-paletteBlue';
        case 'green':
            return 'bg-paletteGreen';
        case 'orange':
            return 'bg-paletteAmber';
        case 'red':
            return 'bg-paletteLighterRed';
        case 'grey':
            return 'bg-paletteGrey';
        case 'indigo':
            return 'bg-paletteDarkerIndigo';

        default:
            return 'bg-paletteLighterRed';
    }
}

export function getBadgeIcon(icon: React.JSX.Element): BadgeIcon {
    switch (icon) {
        case (<Calendar />):
            return 'calendar';
        case (<Wrench />):
            return 'tools';
        case (<Laptop />):
            return 'laptop';
        case (<Users />):
            return 'people';
        case (<Heart />):
            return 'heart';
        case (<Book />):
            return 'book';

        default:
            return 'calendar';
    }
}

export function getBadgeIconComponent(icon: BadgeIcon): React.JSX.Element {
    switch (icon) {
        case 'calendar':
            return <Calendar />;
        case 'tools':
            return <Wrench />;
        case 'laptop':
            return <Laptop />;
        case 'people':
            return <Users />;
        case 'heart':
            return <Heart />;
        case 'book':
            return <Book />;

        default:
            return <Calendar />;
    }
}

export async function fetchBadges(projects: Project[]) {
    const badgesArr: ProjectBadge[] = [];

    async function checkForBadges() {
        projects.forEach(async (project) => {
            const badge = await getBadge(project.id);

            badge && badgesArr.push(badge);
        });
    }

    await checkForBadges();

    return badgesArr;
}
