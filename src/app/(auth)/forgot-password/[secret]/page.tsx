import ForgotPassword from '@/components/Form/ForgotPassword';
import { getSession } from '@/auth';
import React, { FC } from 'react';

interface Props {
    searchParams: {
        secret: string;
    };
}

const page: FC<Props> = async ({ searchParams }) => {
    const params = searchParams;

    await getSession();

    return (
        <section className="mt-36 flex justify-center items-center">
            <ForgotPassword />
        </section>
    );
};

export default page;
