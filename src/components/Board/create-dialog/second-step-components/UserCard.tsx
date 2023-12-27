import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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

type Props = {
    assignedUsers: string[];
    setAssignedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    index: number;
} & (Yourself | OtherUser);

async function getUserByEmail(email: string) {
    const user = await getUser(email);

    return user;
}

const UserCard: FC<Props> = (props) => {
    const [clicked, setClicked] = React.useState(false);
    const { user: storedUser } = useUserStore();

    React.useEffect(() => {
        console.log(props.assignedUsers);
    }, [props.assignedUsers]);

    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (props.yourself) {
                return storedUser;
            }

            const a = await getUserByEmail(props.email);
            return a;
        },
    });

    if (isLoading) {
        return (
            <div>
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="w-20 h-4" />
            </div>
        );
    }

    const handleSetSelected = () => {
        if (clicked) {
            props.setAssignedUsers((prev) =>
                prev.filter((_, i) => i !== props.index)
            );
        }

        if (!clicked) {
            if (props.yourself && user && user.email) {
                props.setAssignedUsers([user.email]);
            } else if (!props.yourself) {
                props.setAssignedUsers((prev) => [...prev, props.email]);
            }
        }

        setClicked((prev) => !prev);
        console.log(props.assignedUsers);
    };

    return (
        <Card
            className={`p-2 max-w-[8rem] hover:bg-secondary cursor-pointer transition duration-200 ${
                clicked ? 'bg-secondary' : ''
            }`}
            role="button"
            aria-label="Assign user to task"
            onClick={handleSetSelected}
        >
            {user == null ? (
                <>
                    <Avatar>
                        <AvatarFallback>
                            {!props.yourself &&
                                props.email.slice(0, 2).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Badge>{!props.yourself && props.email}</Badge>
                </>
            ) : (
                <>
                    <Avatar>
                        {user.image ? <AvatarImage src={user.image} /> : null}
                        <AvatarFallback>
                            {user?.email?.slice(0, 2).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Badge className="mt-2">{user.name}</Badge>
                </>
            )}
        </Card>
    );
};

export default UserCard;
