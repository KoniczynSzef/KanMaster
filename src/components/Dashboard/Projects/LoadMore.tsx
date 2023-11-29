'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getRemainingCount, useProjectStore } from '@/context/project-store';
import { getProjects } from '@/controllers/project-functions';
import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { toast } from 'sonner';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    length: number;
    session: Session;
    user: User;
}

const LoadMore: FC<Props> = ({ length, session, user }) => {
    const router = useRouter();
    const {
        page,
        incrementPage,
        setProjects,
        projects,
        remainingProjects,
        setRemainingProjects,
    } = useProjectStore();

    useEffect(() => {
        setRemainingProjects(getRemainingCount(length, page - 1));
    }, []);

    const handleClick = async () => {
        incrementPage(page + 1);

        toast.info('Loading more projects...');

        const fetchedProjects = await getProjects(session.user?.email, page);

        setProjects([...fetchedProjects, ...projects]);

        setTimeout(() => {
            toast.success('New projects loaded successfully!');
            setRemainingProjects(getRemainingCount(length, page));
        }, 200);

        router.push('/dashboard');
    };

    return (
        <Card className="text-center transition max-w-xs ml-auto flex flex-col">
            <CardHeader>
                <CardTitle>{user.name}&apos;s projects</CardTitle>
            </CardHeader>
            <CardContent>
                {remainingProjects > 0 ? (
                    <>
                        <h4>
                            You have{' '}
                            <span className="text-muted-foreground">
                                {remainingProjects}
                            </span>{' '}
                            remaining project
                            {remainingProjects > 1 && 's'}
                        </h4>
                        <Button onClick={handleClick} className="self-end mt-2">
                            Load older projects
                        </Button>
                    </>
                ) : (
                    <CardDescription>No more projects to load</CardDescription>
                )}
            </CardContent>
        </Card>
    );
};

export default LoadMore;
