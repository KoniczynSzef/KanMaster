'use client';

import { Button } from '@/components/ui/button';
import { getRemainingCount, useProjectStore } from '@/context/project-store';
import { getProjects } from '@/controllers/project-functions';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    length: number;
    session: Session;
}

const LoadMore: FC<Props> = ({ length, session, className }) => {
    const router = useRouter();
    const { page, incrementPage, setProjects, projects } = useProjectStore();
    const handleClick = async () => {
        incrementPage(page + 1);

        toast.info('Loading more projects...');

        const fetchedProjects = await getProjects(session.user?.email, page);

        setTimeout(() => {
            setProjects([...projects, ...fetchedProjects]);
            toast.success('New projects loaded successfully!');
        }, 150);

        router.push('/dashboard');
    };

    const remainingProjects = getRemainingCount(length, page - 1);

    return (
        <div className={className}>
            {remainingProjects > 0 ? (
                <Button onClick={handleClick}>Load more projects</Button>
            ) : (
                <div className="text-center text-muted-foreground">
                    No more projects to load
                </div>
            )}
        </div>
    );
};

export default LoadMore;
