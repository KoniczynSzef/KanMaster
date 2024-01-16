'use client';

import { Button } from '@/components/ui/button';
import { SidebarLink, Variant } from '@/types/sidebar';
import { Project } from '@prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
    link: SidebarLink;
    project: Project;
    isDropdown?: boolean;
};

const SidebarLink: FC<Props> = (props) => {
    const [variant, setVariant] = React.useState<Variant>('ghost');

    return (
        <Button
            asChild
            className="w-full"
            variant={variant}
            onMouseEnter={() => setVariant('secondary')}
            onMouseLeave={() => setVariant('ghost')}
        >
            <Link
                href={`/dashboard/projects/${props.project.id}/${props.link.href}`}
            >
                <span
                    className={`mr-auto ${
                        props.link.isActive
                            ? 'font-bold text-foreground'
                            : 'font-normal text-muted-foreground'
                    }`}
                >
                    {props.link.label}
                </span>
            </Link>
        </Button>
    );
};

export default SidebarLink;
