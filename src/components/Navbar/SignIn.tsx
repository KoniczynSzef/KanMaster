'use client';

import React, { FC } from 'react';
import { Button } from '../ui/button';

interface Props {}

const SignIn: FC<Props> = ({}) => {
    const handleClick = async () => {
        console.log('clicked - not implemented yet');
    };
    return <Button onClick={handleClick}>Sign in</Button>;
};

export default SignIn;
