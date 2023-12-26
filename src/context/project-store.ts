import { sortedByPerson, sorting, sortingDirection } from '@/types/project';
import { Project, ProjectBadge } from '@prisma/client';
import { create } from 'zustand';

export type projectType = Omit<Project, 'id' | 'createdAt'> & {
    id?: string;
};

type ProjectStore = {
    projects: projectType[] | Project[];
    setProjects: (projects: projectType[] | Project[]) => void;

    setSingleProject: (project: Project) => void;
    project: Project | undefined;

    hasLoaded: boolean;
    setHasLoaded: (value: boolean) => void;
    badges: ProjectBadge[];
    setBadges: (badges: ProjectBadge[]) => void;

    page: number;
    incrementPage: (apge: number) => void;

    remainingProjects: number;
    setRemainingProjects: (remainingProjects: number) => void;

    sorting: sorting;
    setSorting: (sorting: sorting) => void;
    sortingDirection: sortingDirection;
    setSortingDirection: (sortingDirection: sortingDirection) => void;

    sortedPerson: sortedByPerson;
    setSortedPerson: (sortedByPerson: sortedByPerson) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
    hasLoaded: false,
    projects: [],
    setProjects(projects) {
        set(() => ({
            projects,
        }));
    },
    setSingleProject(project) {
        set(() => ({
            project,
        }));
    },
    project: undefined,

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

    sorting: 'name',
    sortingDirection: 'asc',

    page: 2,
    incrementPage(page) {
        set(() => ({
            page,
        }));
    },

    remainingProjects: 0,
    setRemainingProjects(remainingProjects) {
        set(() => ({
            remainingProjects,
        }));
    },

    setSorting(sorting) {
        set(() => ({
            sorting,
        }));
    },

    setSortingDirection(sortingDirection) {
        set(() => ({
            sortingDirection,
        }));
    },

    sortedPerson: 'all',
    setSortedPerson(sortedPerson) {
        set(() => ({
            sortedPerson,
        }));
    },
}));

export const filterProjects = (projects: Project[], filter: string) => {
    return projects.filter((project) =>
        project.name.toLowerCase().startsWith(filter.toLowerCase())
    );
};

export const sortByDeadline = (projects: Project[]) => {
    const newProjects = projects.toSorted(
        (a, b) => a.deadline.getTime() - b.deadline.getTime()
    );
    return newProjects;
};

export const sortByName = (projects: Project[], asc: boolean) => {
    const sortedProjects = projects.toSorted((a, b) =>
        a.name.localeCompare(b.name)
    );

    return asc ? sortedProjects : sortedProjects.reverse();
};

export function getRemainingCount(length: number, page: number) {
    return length - page * 6;
}

export const getProjectsWhereLeader = (
    projects: Project[],
    userId: string,
    person: sortedByPerson
) => {
    switch (person) {
        case 'all':
            return projects;
        case 'member':
            return projects.filter(
                (project) => project.teamLeaderId !== userId
            );
    }

    return projects.filter((project) => project.teamLeaderId === userId);
};

export function getSortedPerson(person: sortedByPerson) {
    switch (person) {
        case 'all':
            return 'leader';
        case 'leader':
            return 'member';
        case 'member':
            return 'all';
    }
}
