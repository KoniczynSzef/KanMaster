import { z } from 'zod';

export const schema = z.object({
    username: z.string().min(5),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8),
});

export type schemaType = z.infer<typeof schema>;

export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' }),
});

export const forgotPasswordSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
    })
    .superRefine((data) => {
        if (data.password !== data.confirmPassword) {
            return {
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            };
        }

        return true;
    });

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export type signInSchema = z.infer<typeof signInSchema>;
