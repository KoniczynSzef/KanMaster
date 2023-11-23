import { Badge } from '@/context/project-form-store';
import { createBadge } from '@/controllers/badge-functions';
import { getBadgeColor, getBadgeIcon } from '@/helpers/badge-helpers';
import { Project } from '@prisma/client';

export async function POST(req: Request) {
    const data: [Project, Badge] = await req.json();

    const color = getBadgeColor(data[1].color);
    const icon = getBadgeIcon(data[1].icon);

    const badge = await createBadge(data[0].id, {
        color,
        icon,
        projectId: data[0].id,
    });

    return new Response(JSON.stringify(badge));
}
