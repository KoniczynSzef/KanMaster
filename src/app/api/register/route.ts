import { db } from '@/db';
import { schemaType } from '@/types/form-schema';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
    const { username, email, password }: schemaType = await req.json();

    const exists = await db.user.findUnique({
        where: { email },
    });

    if (exists) {
        return new Response(
            JSON.stringify({ error: 'User already exists. Please try again.' })
        );
    }
    const secret = crypto.randomUUID();

    const user = await db.user.create({
        data: {
            name: username,
            email,
            hashedPassword: await hash(password, 10),
            secret,
        },
    });

    return new Response(JSON.stringify(user));
}
