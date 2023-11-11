import SignIn from '@/components/Form/SignIn';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = () => {
    return (
        <section className="mt-36 flex justify-center items-center">
            <SignIn />
        </section>
    );
};

export default page;
