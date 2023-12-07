'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { resetStore, useProjectFormStore } from '@/context/project-form-store';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Badge from '../Projects/Badge';
import { getUser } from '@/controllers/user-functions';
import { useProjectStore } from '@/context/project-store';
import { createProject } from '@/controllers/project-functions';
import { ProjectBadge } from '@prisma/client';
import { sendNotification } from '@/controllers/notification-functions';
import { CreatedProject } from '@/types/project';

const f = new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
});

interface Props {
    user: Awaited<ReturnType<typeof getUser>>;
}

const FormSummary: FC<Props> = ({ user }) => {
    const router = useRouter();

    const [disabled, setDisabled] = useState(false);

    const { title, description, members, badge, deadline, step } =
        useProjectFormStore();
    const { setBadges, badges, setProjects, projects, setRemainingProjects } =
        useProjectStore();

    useEffect(() => {
        if (step < 3) {
            toast.error('You must complete all steps before submitting');

            resetStore();
            return router.push('/dashboard');
        }
    }, []);

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
            toast.info('Creating project...');
            setDisabled(true);

            const project: CreatedProject = {
                name: title,
                deadline,
                description,
                memberEmails: members,
                memberEmailsVerified: [],

                teamLeaderId: user.id,
            };

            const newProject = await createProject(project, user.email);

            const res = await fetch('/api/badge', {
                method: 'POST',
                body: JSON.stringify([newProject, { ...badge }, user.id]),
            });

            const createdBadge: ProjectBadge = await res.json();

            setBadges([
                ...badges.slice(0, badges.length - 1),
                {
                    ...createdBadge,
                    id: createdBadge.id,
                    projectId: newProject.id,
                    userId: user.id,
                },
            ]);

            setProjects([newProject, ...projects]);
            setRemainingProjects(0);

            members.forEach(async (member) => {
                await sendNotification(
                    {
                        title: `${user.name} added you to a project ${title}`,
                        description: `You have been added to the project ${title}`,
                        isSender: false,
                        userEmail: member,
                        projectId: newProject.id,
                    },
                    false
                );
            });

            resetStore();
            toast.success('Project created successfully');

            router.push('/dashboard');
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

                    <Button onClick={handleCreateProject} disabled={disabled}>
                        Create Project
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FormSummary;
