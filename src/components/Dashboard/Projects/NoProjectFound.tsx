import React, { FC } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../ui/card';

interface Props {
    customLabel?: string;
}

const NoProjectFound: FC<Props> = ({ customLabel }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">
                    No projects found
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {customLabel
                        ? customLabel
                        : 'No projects were found for the given search criteria.'}
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default NoProjectFound;
