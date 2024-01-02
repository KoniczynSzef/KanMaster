import React, { FC } from 'react';

interface Props {
    params: {
        secret: string;
    };
}

const page: FC<Props> = async ({ params }) => {
    const { secret } = params;

    return <div className="text-white">{secret}</div>;
};

export default page;
