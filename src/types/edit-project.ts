import { z } from 'zod';

export const EditProjectFormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(250),
    deadline: z.date().min(new Date()),
});

export type EditProjectFormSchemaType = z.infer<typeof EditProjectFormSchema>;
