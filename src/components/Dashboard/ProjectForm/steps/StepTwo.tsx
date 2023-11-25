import React, { FC, useState } from 'react';
import { useProjectFormStore } from '@/context/project-form-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { toast } from 'sonner';

interface Props {}

const emailValidation = z.string().email();

const StepTwo: FC<Props> = () => {
    const [email, setEmail] = useState('');
    const { members, addMember } = useProjectFormStore();

    const handleAddMember = () => {
        if (
            emailValidation.safeParse(email).success &&
            !members.includes(email)
        ) {
            addMember(email);
            setEmail('');
        } else if (members.includes(email)) {
            toast.error('This member is already added');
        } else {
            toast.error('Please enter a valid email');
        }
    };

    return (
        <>
            <div className="flex gap-4">
                <Input
                    placeholder="Member email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleAddMember} type="button">
                    Invite
                </Button>
            </div>
            <ol className="list-decimal ml-4">
                {members.map((member) => (
                    <li key={member}>{member}</li>
                ))}
            </ol>
        </>
    );
};

export default StepTwo;
