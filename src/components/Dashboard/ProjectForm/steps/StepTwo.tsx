import React, { FC, useState } from 'react';
import { useProjectFormStore } from '@/context/project-form-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useUserStore } from '@/context/user-store';

interface Props {}

const emailValidation = z.string().email();

const StepTwo: FC<Props> = () => {
    const [email, setEmail] = useState('');
    const { user } = useUserStore();
    const { members, addMember, removeMember } = useProjectFormStore();

    const handleAddMember = () => {
        if (email === user?.email) {
            toast.error('You cannot add yourself!');
            setEmail('');
            return;
        }

        if (
            emailValidation.safeParse(email).success &&
            !members.includes(email)
        ) {
            addMember(email);
        } else if (members.includes(email)) {
            toast.error('This member is already added');
        } else {
            toast.error('Please enter a valid email');
        }

        setEmail('');
    };

    return (
        <>
            <div className="flex gap-4 flex-col md:flex-row">
                <Input
                    placeholder="Member email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    onClick={handleAddMember}
                    type="button"
                    variant={'outline'}
                >
                    Invite
                </Button>
            </div>
            <ul className="my-4 space-y-2">
                {members.map((member) => (
                    <li
                        key={member}
                        className="border border-muted px-4 py-2 rounded flex justify-between items-center"
                    >
                        <span className="font-medium">{member}</span>
                        <Button
                            size={'icon'}
                            variant={'destructive'}
                            onClick={() => removeMember(member)}
                        >
                            <X />
                        </Button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default StepTwo;
