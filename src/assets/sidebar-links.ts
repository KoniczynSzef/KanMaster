import { SidebarLink } from '@/types/sidebar';

export const sidebarLinks: SidebarLink[] = [
    {
        label: 'Kanban Board',
        variant: 'ghost',
        href: '',
        isActive: true,
    },
    {
        label: 'Project Profile',
        variant: 'ghost',
        href: './profile-settings',
    },
    {
        label: 'Contact',
        variant: 'ghost',
        href: './contact',
    },
];
