import { projectType } from '@/context/project-store';

export type CreatedProject = Omit<projectType, 'userId' | 'user'>;
export type sortedByPerson = 'leader' | 'member' | 'all';
export type sorting = 'deadline' | 'name';
export type sortingDirection = 'asc' | 'desc';
