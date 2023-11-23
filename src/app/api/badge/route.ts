export async function POST(req: Request) {
    const badge: Omit<ProjectBadge, 'id'> = await req.json();
}
