import ForgotPassword from '@/components/Form/ForgotPassword';
import React, { FC } from 'react';

interface Props {
    searchParams: {
        secret: string;
    };
}

const page: FC<Props> = async ({ searchParams }) => {
    const params = searchParams;

    console.log(params);

    return (
        <section className="mt-36 flex justify-center items-center">
            <ForgotPassword />
        </section>
    );
};

export default page;
