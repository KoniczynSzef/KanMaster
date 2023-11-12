import { db } from '@/db';
import { signInSchema } from '@/types/form-schema';
import { compare } from 'bcryptjs';

export async function POST(req: Request) {
    const body: signInSchema = await req.json();

    const user = await db.user.findUnique({
        where: {
            email: body.email,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await compare(
        body.password,
        user.hashedPassword ?? ''
    );

    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return new Response(JSON.stringify(user));
}
