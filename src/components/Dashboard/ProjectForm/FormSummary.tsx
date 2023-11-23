'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useProjectFormStore } from '@/context/project-form-store';
import { projectType, useProjectStore } from '@/context/project-store';
import { createProject } from '@/controllers/project-functions';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

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
    const { setProjects, projects } = useProjectStore();
    const { title, description, members, badge, deadline } =
        useProjectFormStore();

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
            setProjects([...projects, project]);
            toast.info('Creating project...');

            const newProject = await createProject(project, user.email);
            toast.success('Project created successfully');

            await fetch('/api/badge', {
                method: 'POST',
                body: JSON.stringify([newProject, { ...badge }]),
            });

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

                    <Button
                        size={'icon'}
                        className={`${badge.color} hover:${badge.color} hover:opacity-70 transition-all duration-300`}
                    >
                        {badge.icon}
                    </Button>
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

                <Button className="mt-4 ml-auto" onClick={handleCreateProject}>
                    Create Project
                </Button>
            </CardContent>
        </Card>
    );
};

export default FormSummary;
