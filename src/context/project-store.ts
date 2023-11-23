import { Project, ProjectBadge } from '@prisma/client';
import { create } from 'zustand';
import { Badge } from './project-form-store';

export type projectType = Omit<Project, 'id' | 'createdAt' | 'teamLeaderId'> & {
    id?: string;
};

type ProjectStore = {
    projects: projectType[] | Project[];
    setProjects: (projects: projectType[] | Project[]) => void;
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
    badges: ProjectBadge[] | Badge[];
    setBadges: (badges: ProjectBadge[] | Badge[]) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
    hasLoaded: false,
    projects: [],
    setProjects(projects) {
        set(() => ({
            projects,
        }));
    },
    setHasLoaded(value) {
        set(() => ({
            hasLoaded: value,
        }));
    },

    badges: [],
    setBadges(badges) {
        set(() => ({
            badges,
        }));
    },
}));

export const filterProjects = (projects: Project[], filter: string) => {
    return projects.filter((project) =>
        project.name.toLowerCase().startsWith(filter.toLowerCase())
    );
};

export const filterByDeadline = (projects: Project[]) => {
    return projects.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
};
