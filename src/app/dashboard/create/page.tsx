import { options } from '@/auth/options';
import FormWrapper from '@/components/Dashboard/ProjectForm/FormWrapper';
import { getUser } from '@/controllers/user-functions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const page: FC<Props> = async () => {
    const session = await getServerSession(options);

    if (!session) {
        return redirect('/sign-in');
    }

    const user = await getUser(session.user?.email);
    return <FormWrapper user={user} />;
};

export default page;
