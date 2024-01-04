'use client';

import ForgotPassword from '@/components/Form/ForgotPassword';
import { getUserByUniqueProp } from '@/controllers/user-functions';
import { compare } from 'bcryptjs';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

interface Props {
    secret: string;
}

const ClientComponent: FC<Props> = ({ secret }) => {
    const hashedSecret = localStorage.getItem('hashedSecret');

    const { data: user, isLoading } = useQuery({
        queryKey: ['user-by-secret'],

        queryFn: async () => {
            if (!hashedSecret) {
                return;
            }

            const areSecretsEqual = await compare(secret, hashedSecret);

            if (!areSecretsEqual) {
                return;
            }

            localStorage.removeItem('hashedSecret');
            localStorage.removeItem('secret');

            return await getUserByUniqueProp('secret', secret);
        },
    });

    if (!user) {
        return (
            <div className="text-xl font-bold container relative flex justify-center py-24">
                There is no user with this secret!
            </div>
        );
    }

    return (
        <div className="container relative flex justify-center py-24">
            {isLoading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <ForgotPassword secret={user.secret} />
            )}
        </div>
    );
};

export default ClientComponent;
