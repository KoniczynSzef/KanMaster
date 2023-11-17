import { Project } from '@prisma/client';
import { create } from 'zustand';

type ProjectStore = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
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
