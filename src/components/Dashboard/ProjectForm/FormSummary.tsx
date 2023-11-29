'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { resetStore, useProjectFormStore } from '@/context/project-form-store';
import { projectType, useProjectStore } from '@/context/project-store';
import { getBadges } from '@/controllers/badge-functions';
import { createProject } from '@/controllers/project-functions';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';
import Badge from '../Projects/Badge';

const f = new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
});

interface Props {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        hashedPassword: string | null;
        emailVerified: Date | null;
        image: string | null;
        projectIDs: string[];
    } | null;
}

const FormSummary: FC<Props> = ({ user }) => {
    const router = useRouter();
    const { setProjects, projects, setBadges, badges, setRemainingProjects } =
        useProjectStore();
    const { title, description, members, badge, deadline } =
        useProjectFormStore();

    const handleCancel = () => {
        toast.error('Project creation cancelled');
        resetStore();

        return router.push('/dashboard');
    };

    const handleCreateProject = async () => {
        if (!user) {
            return;
        }

        try {
            const project: projectType = {
                name: title,
                deadline,
                description,
                memberIDs: members,
            };

            toast.info('Creating project...');

            const newProject = await createProject(project, user.email);

            await fetch('/api/badge', {
                method: 'POST',
                body: JSON.stringify([newProject, { ...badge }, user.id]),
            });

            const newBadges = await getBadges(user.email);

            setBadges([
                ...badges.slice(0, badges.length - 1),
                {
                    ...badges[badges.length - 1],
                    id: newBadges[newBadges.length - 1].id,
                    projectId: newProject.id,
                    userId: user.id,
                },
            ]);

            setProjects([newProject, ...projects]);
            setRemainingProjects(0);

            toast.success('Project created successfully');

            router.push('/dashboard');
            resetStore();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong while creating the project');
        }
    };

    return (
        <Card className="mt-16">
            <CardHeader>
                <CardTitle>Form Summary</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 flex flex-col">
                <article className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">{title}</h3>
                        <p className="text-muted-foreground mb-4">
                            {description}
                        </p>
                    </div>

                    <Badge withId={false} badge={badge} />
                </article>
                {members.length > 0 ? (
                    <ScrollArea className="h-72 rounded-md border p-4">
                        <ol className="list-decimal ml-8 text-muted-foreground space-y-1">
                            {members.map((member, idx) => (
                                <li key={idx}>
                                    <p className="text-muted-foreground">
                                        {member}
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <ScrollBar orientation="horizontal" />
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                ) : (
                    <p className="text-destructive">No members added yet</p>
                )}

                <p className="mt-4">
                    <span className="font-bold">Deadline: </span>
                    {f.format(deadline)}
                </p>

                <div className="flex justify-between items-center mt-8">
                    <Button variant={'destructive'} onClick={handleCancel}>
                        Cancel
                    </Button>

                    <Button onClick={handleCreateProject}>
                        Create Project
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormSummary;
