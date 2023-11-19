import { Project } from '@prisma/client';
import { create } from 'zustand';

type formDescription =
    | "Let's start with the project title and a brief description. It's the first step towards your goal."
    | "Now it's time to build your team. Add your first team members who will help you achieve success."
    | "Share your project's deadline and add a badge. Your project deserves recognition!";

type projectStore = {
    step: number;
    project: Project | null;
    createProject: (project: Project) => void;
    setStep: () => void;

    formDescription: formDescription;

    changeFormDescription: (description: formDescription) => void;

    title: string;
    description: string;

    setTitle: (title: string) => void;
    setDescription: (description: string) => void;

    members: string[];

    addMember: (member: string) => void;
    removeMember: (member: string) => void;

    badgeColor: string;
    badgeIcon: string;
    deadline: Date;

    setBadgeColor: (badgeColor: string) => void;
    setBadgeIcon: (badgeIcon: string) => void;
    setDeadline: (deadline: Date) => void;
};

export const useProjectFormStore = create<projectStore>((set) => ({
    project: null,
    step: 1,
    title: '',
    description: '',
    formDescription:
        "Let's start with the project title and a brief description. It's the first step towards your goal.",

    changeFormDescription(d) {
        set(() => ({
            formDescription:
                d ===
                "Let's start with the project title and a brief description. It's the first step towards your goal."
                    ? "Now it's time to build your team. Add your first team members who will help you achieve success."
                    : "Share your project's deadline and add a badge. Your project deserves recognition!",
        }));
    },

    setTitle(title) {
        set(() => ({
            title,
        }));
    },
    setDescription(description) {
        set(() => ({
            description,
        }));
    },

    members: [],

    addMember(member) {
        set((state) => ({
            members: [...state.members, member],
        }));
    },

    removeMember(member) {
        set((state) => ({
            members: state.members.filter((m) => m !== member),
        }));
    },

    badgeColor: '',
    badgeIcon: '',
    deadline: new Date(),

    setBadgeColor(badgeColor) {
        set(() => ({
            badgeColor,
        }));
    },

    setBadgeIcon(badgeIcon) {
        set(() => ({
            badgeIcon,
        }));
    },

    setDeadline(deadline) {
        set(() => ({
            deadline,
        }));
    },
    createProject(project) {
        set(() => ({
            project,
        }));
    },
    setStep() {
        set((state) => ({
            step: (state.step += 1),
        }));
    },
}));
