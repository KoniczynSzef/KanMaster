import { Project } from '@prisma/client';
import { create } from 'zustand';
import { BadgeIcon } from '@/types/badge';

type formDescription =
    | "Let's start with the project title and a brief description. It's the first step towards your goal."
    | "Now it's time to build your team. Add your first team members who will help you achieve success."
    | "Share your project's deadline and add a badge. Your project deserves recognition!"
    | 'Last step! Share your project with the world. You can always edit it later.';

export type Badge = {
    color: string;
    icon: BadgeIcon;
};

type projectStore = {
    id?: string;
    step: number;
    project: Omit<Project, 'createdAt' | 'teamLeaderId'> | null;
    createProject: (project: Project) => void;
    setStep: () => void;
    decrementStep: () => void;

    formDescription: formDescription;

    changeFormDescription: (description: formDescription) => void;

    title: string;
    description: string;

    setTitle: (title: string) => void;
    setDescription: (description: string) => void;

    members: string[];

    addMember: (member: string) => void;
    removeMember: (member: string) => void;

    badge: Badge;
    deadline: Date;

    setBadge: (badge: Badge) => void;
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

    badge: {
        color: 'bg-paletteLighterRed',
        icon: 'calendar',
    },
    deadline: new Date(new Date().getTime() + 86400000),

    setBadge(badge) {
        set(() => ({
            badge,
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
    decrementStep() {
        set((state) => ({
            step: (state.step -= 1),
        }));
    },
}));
