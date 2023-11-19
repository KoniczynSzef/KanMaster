import { Project } from '@prisma/client';
import { create } from 'zustand';

export type projectType = Omit<Project, 'id' | 'createdAt' | 'teamLeaderId'>;

type ProjectStore = {
    projects: projectType[] | Project[];
    setProjects: (projects: projectType[] | Project[]) => void;
    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
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
}));

export const filterProjects = (projects: Project[], filter: string) => {
    return projects.filter((project) =>
        project.name.toLowerCase().startsWith(filter.toLowerCase())
    );
};

export const filterByDeadline = (projects: Project[]) => {
    return projects.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
};
