import { SidebarLink } from '@/types/sidebar';

export const sidebarLinks: SidebarLink[] = [
    {
        label: 'Kanban Board',
        variant: 'ghost',
        href: '',
        isActive: true,
    },
    {
        label: 'Project Settings',
        variant: 'ghost',
        href: './project-settings',
    },
    {
        label: 'Contact',
        variant: 'ghost',
        href: './contact',
    },
];
