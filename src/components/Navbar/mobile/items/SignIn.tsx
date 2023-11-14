'use client';

import React, { FC, useState } from 'react';
import { Button } from '../../../ui/button';
import { logIn } from '@/auth';
import { toast } from 'sonner';

interface Props {}

const SignIn: FC<Props> = () => {
    const [clicked, setClicked] = useState(false);

    const handleSignIn = async () => {
        try {
            setClicked(true);
            await logIn('github');

            setTimeout(() => {
                toast.success('Signed in successfully');
            }, 150);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                throw new Error(error.message);
            }

            throw new Error('Something went wrong');
        }
    };

    return (
        <div className="flex items-center gap-3">
            <Button onClick={handleSignIn} disabled={clicked}>
                {!clicked ? <>Sign in</> : <>Authenticating...</>}
            </Button>
        </div>
    );
};

export default SignIn;
