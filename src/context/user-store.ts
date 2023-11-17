import { User } from '@prisma/client';
import { create } from 'zustand';

import { User as SessionUser } from 'next-auth';
import { getUser } from '@/controllers/user-functions';

type UserStore = {
    user: User | null;
    setUser: (user: UserType | null) => void;
};

export type UserType = Omit<SessionUser, 'id'>;

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    async setUser(user) {
        if (!user) {
            return;
        }

        const userFromDB = await getUser(user.email);
        set(() => ({
            user: userFromDB,
        }));
    },
}));
