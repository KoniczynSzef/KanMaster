'use client';

import React, { FC } from 'react';
import { Button } from './ui/button';
import { createProject } from '@/controllers/project-functions';
import { useRouter } from 'next/navigation';

interface Props {
    email: string | null | undefined;
}

const Test: FC<Props> = ({ email }) => {
    const router = useRouter();
    const handleClick = async () => {
        if (email) {
            await createProject(
                {
                    name: 'Test Project',
                    description: 'This is a test project',
                    memberIDs: [],
                },
                email
            );

            router.push('/dashboard');
        }
    };
    return (
        <Button onClick={handleClick} className="mt-12">
            Create project
        </Button>
    );
};

export default Test;
