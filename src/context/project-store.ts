import { Project } from '@prisma/client';
import { create } from 'zustand';

type ProjectStore = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    setProjects(projects) {
        set(() => ({
            projects,
        }));
    },
}));

export const filterProjects = (projects: Project[], filter: string) => {
    return projects.filter((project) =>
        project.name.toLowerCase().includes(filter.toLowerCase())
    );
};
