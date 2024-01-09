import { Button } from '@/components/ui/button';
import { SidebarLink, Variant } from '@/types/sidebar';
import { Project } from '@prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
    link: SidebarLink;
    project: Project;
}

const SidebarLink: FC<Props> = ({ link, project }) => {
    const [variant, setVariant] = React.useState<Variant>('ghost');

    return (
        <Button
            asChild
            className="w-full"
            variant={variant}
            onMouseEnter={() => setVariant('secondary')}
            onMouseLeave={() => setVariant('ghost')}
        >
            <Link href={`/dashboard/projects/${project.id}/${link.href}`}>
                <span
                    className={`mr-auto ${
                        link.isActive
                            ? 'font-bold text-foreground'
                            : 'font-normal text-muted-foreground'
                    }`}
                >
                    {link.label}
                </span>
            </Link>
        </Button>
    );
};

export default SidebarLink;
