import Register from '@/components/Form/Register';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = () => {
    return (
        <section className="mt-36 flex justify-center items-center">
            <Register />
        </section>
    );
};

export default page;
