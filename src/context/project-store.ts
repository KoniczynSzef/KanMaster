import { Project } from '@prisma/client';
import { create } from 'zustand';

type ProjectStore = {
    projects: Project[];
    filterProjects: (searchTerm: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    filterProjects(searchTerm) {
        set((state) => ({
            projects: state.projects.filter((project) =>
                project.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }));
    },
}));
