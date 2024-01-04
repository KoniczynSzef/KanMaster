import React, { FC } from 'react';
import ClientComponent from './ClientComponent';

interface Props {
    params: {
        secret: string;
    };
}

const page: FC<Props> = async ({ params }) => {
    return (
        <div className="text-white">
            <ClientComponent secret={params.secret} />
        </div>
    );
};

export default page;
