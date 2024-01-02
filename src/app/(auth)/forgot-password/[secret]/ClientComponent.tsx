'use client';

import { getUserByUniqueProp } from '@/controllers/user-functions';
import { compare } from 'bcryptjs';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

interface Props {
    secret: string;
    hashedSecret: string;
}

const ClientComponent: FC<Props> = ({ secret, hashedSecret }) => {
    const storedValue = localStorage.getItem('secret');

    const { data: user, isLoading } = useQuery({
        queryKey: ['user-by-secret'],

        queryFn: async () => {
            console.log(hashedSecret, storedValue);
            console.log(hashedSecret === storedValue);

            if (!storedValue) {
                return;
            }

            if (hashedSecret !== storedValue) {
                return;
            }

            const areSecretsEqual = await compare(secret, hashedSecret);
            console.log(areSecretsEqual);

            if (!areSecretsEqual) {
                return;
            }

            return await getUserByUniqueProp('secret', secret);
        },

        enabled: !!secret,
    });

    if (!user) {
        return (
            <div className="text-xl font-bold">
                There is no user with this secret!
            </div>
        );
    }

    return (
        <div>
            {isLoading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <div className="text-xl font-bold">{user.name}</div>
            )}
        </div>
    );
};

export default ClientComponent;
