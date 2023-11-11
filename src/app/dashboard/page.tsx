import { options } from '@/auth/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/');
    }

    return (
        <div className="p-24">
            <h3 className="text-3xl font-bold">Dashboard Page</h3>
            <pre className="mt-6">{JSON.stringify(session.user)}</pre>
        </div>
    );
};

export default page;
