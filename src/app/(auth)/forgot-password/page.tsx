'use client';

import { options } from '@/auth/options';
import ForgotPassword from '@/components/Form/ForgotPassword';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <section className="mt-36 flex justify-center items-center">
            <ForgotPassword />
        </section>
    );
};

export default page;
