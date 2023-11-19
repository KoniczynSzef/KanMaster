import { z } from 'zod';

export const ProjectFormSchema = z.object({
    title: z.string().min(5).max(255),
    description: z.string().min(5).max(255),
});

export type ProjectFormSchema = z.infer<typeof ProjectFormSchema>;
