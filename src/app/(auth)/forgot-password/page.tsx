'use client';

import ForgotPassword from '@/components/Form/ForgotPassword';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = () => {
    return (
        <section className="mt-36 flex justify-center items-center">
            <ForgotPassword />
        </section>
    );
};

export default page;
