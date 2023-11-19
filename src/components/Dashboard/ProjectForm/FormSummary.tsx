import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProjectFormStore } from '@/context/project-form-store';
import React, { FC } from 'react';

interface Props {}

const FormSummary: FC<Props> = () => {
    const { title, description } = useProjectFormStore();
    console.log(title);

    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Form Summary</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
};

export default FormSummary;
