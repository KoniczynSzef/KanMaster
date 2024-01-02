import React, { FC } from 'react';
import ClientComponent from './ClientComponent';

interface Props {
    params: {
        secret: string;
    };

    searchParams: {
        hashedSecret: string;
    };
}

const page: FC<Props> = async ({ params, searchParams }) => {
    return (
        <div className="text-white">
            <ClientComponent
                secret={params.secret}
                hashedSecret={searchParams.hashedSecret}
            />
        </div>
    );
};

export default page;
