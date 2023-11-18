import { z } from 'zod';

export const ProjectFormSchema = z.object({
    title: z.string().min(5).max(255),
    description: z.string().min(5).max(255),
    members: z.string().email(),
    badgeColor: z.string(),
    badgeIcon: z.string(),
});

export const ProjectFormSchemaStepOne = ProjectFormSchema.omit({
    badgeColor: true,
    badgeIcon: true,
    members: true,
});

export const ProjectFormSchemaStepTwo = ProjectFormSchema.omit({
    badgeColor: true,
    badgeIcon: true,
    description: true,
    title: true,
});

export type ProjectFormSchema = z.infer<typeof ProjectFormSchema>;

export type stepOne = Omit<
    ProjectFormSchema,
    'members' | 'badgeColor' | 'badgeIcon'
>;
