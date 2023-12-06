import { projectType } from '@/context/project-store';

export type CreatedProject = Omit<projectType, 'userId' | 'user'>;
