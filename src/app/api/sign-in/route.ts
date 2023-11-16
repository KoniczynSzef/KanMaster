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
        return new Response(
            JSON.stringify({
                error: 'User not found. Please check the provided email.',
            })
        );
    }

    const isValidPassword = await compare(
        body.password,
        user.hashedPassword ?? ''
    );

    if (!isValidPassword) {
        return new Response(
            JSON.stringify({
                error: 'Invalid password or email. Try again!.',
            })
        );
    }

    return new Response(JSON.stringify(user));
}
