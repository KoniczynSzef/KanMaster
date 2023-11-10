'use client';

import React, { FC } from 'react';
import { Button } from '../ui/button';
import { logIn } from '@/auth';
import { toast } from 'sonner';

interface Props {}

const SignIn: FC<Props> = () => {
    const handleClick = async () => {
        try {
            await logIn('github');
            toast.success('Signed in successfully');
        } catch (error) {
            throw new Error('There was an error signing in');
        }
    };

    return <Button onClick={handleClick}>Sign in</Button>;
};

export default SignIn;
