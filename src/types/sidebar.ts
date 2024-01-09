import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

export type Variant = VariantProps<typeof buttonVariants>['variant'];

export type SidebarLink = {
    label: string;
    variant: Variant;
    href: string;

    isActive?: boolean;
};
