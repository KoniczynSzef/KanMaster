import { options } from '@/auth/options';
import Test from '@/components/Test';
import { getProjects } from '@/controllers/project-functions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/');
    }

    const projects = await getProjects(session?.user?.email);

    return (
        <div className="p-24">
            <h3 className="text-3xl font-bold">Dashboard Page</h3>
            <pre className="mt-6">{JSON.stringify(session.user)}</pre>

            <Test email={session.user?.email} />
        </div>
    );
};

export default page;
