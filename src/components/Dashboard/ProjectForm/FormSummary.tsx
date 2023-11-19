import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useProjectFormStore } from '@/context/project-form-store';
import React, { FC } from 'react';

interface Props {}

const FormSummary: FC<Props> = () => {
    const { title, description, members, badge } = useProjectFormStore();
    console.log(title);

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

                <Button className="mt-4 ml-auto">Create Project</Button>
            </CardContent>
        </Card>
    );
};

export default FormSummary;
