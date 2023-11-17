import { z } from 'zod';

export const ProjectFormSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    members: z.array(z.string()),
    deadline: z.date().min(new Date()),
    badgeColor: z.string(),
    badgeIcon: z.string(),
});

export type ProjectFormSchema = z.infer<typeof ProjectFormSchema>;
