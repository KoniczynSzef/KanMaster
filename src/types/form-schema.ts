import { z } from 'zod';

export const schema = z.object({
    username: z.string().min(3),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8),
});

export type schemaType = z.infer<typeof schema>;

export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8),
});

export type signInSchema = z.infer<typeof signInSchema>;
