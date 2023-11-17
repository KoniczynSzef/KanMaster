import React, { FC } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card';

interface Props {}

const NoProjectFound: FC<Props> = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    No projects found
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    No projects were found for the given search criteria.
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default NoProjectFound;
