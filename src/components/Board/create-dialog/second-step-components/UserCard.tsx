import { useUserStore } from '@/context/user-store';
import { getUser } from '@/controllers/user-functions';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

interface Yourself {
    yourself: true;
}

interface OtherUser {
    yourself: false;
    email: string;
}

type Props = Yourself | OtherUser;

async function getUserByEmail(email: string) {
    const user = await getUser(email);

    return user;
}

const UserCard: FC<Props> = (props) => {
    const { user: storedUser } = useUserStore();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (props.yourself) {
                return storedUser;
            }

            await getUserByEmail(props.email);
        },
    });

    console.log(user);

    return <div>{JSON.stringify(user)}</div>;
};

export default UserCard;
