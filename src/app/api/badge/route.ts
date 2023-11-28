import { Badge } from '@/context/project-form-store';
import { createBadge } from '@/controllers/badge-functions';
import { getBadgeColor } from '@/helpers/badge-helpers';
import { Project } from '@prisma/client';

export async function POST(req: Request) {
    const [project, badge, userId]: [Project, Badge, string] = await req.json();

    const color = getBadgeColor(badge.color);

    const newBadge = await createBadge(project.id, {
        color,
        icon: badge.icon,
        projectId: project.id,
        userId,
    });

    return new Response(JSON.stringify(newBadge));
}
