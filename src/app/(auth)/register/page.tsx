import { getSession } from '@/auth';
import Register from '@/components/Form/Register';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    await getSession();

    return (
        <section className="mt-36 flex justify-center items-center">
            <Register />
        </section>
    );
};

export default page;
