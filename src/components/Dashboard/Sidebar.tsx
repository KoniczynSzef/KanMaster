import { Project } from '@prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';
import { Button } from '../ui/button';

interface Props {
    project: Project;
}

const Sidebar: FC<Props> = (props) => {
    return (
        <div className="w-72">
            <Button asChild className="w-full" variant={'ghost'}>
                <Link href={`/dashboard/projects/${props.project.id}`}>
                    <span className="mr-auto font-bold">Dashboard</span>
                </Link>
            </Button>
            <Button asChild className="w-full" variant={'ghost'}>
                <Link href={`/dashboard/projects/${props.project.id}`}>
                    <span className="mr-auto text-muted-foreground">
                        Dashboard
                    </span>
                </Link>
            </Button>
        </div>
    );
};

export default Sidebar;
