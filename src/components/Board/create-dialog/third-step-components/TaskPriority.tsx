import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface Props {
    setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
    priority: 1 | 2 | 3;
}

const PriorityButton: FC<
    Props & { value: 1 | 2 | 3; text: 'low' | 'medium' | 'high' }
> = ({ setPriority, value, text, priority }) => {
    return (
        <Button
            onClick={() => {
                setPriority(value);
            }}
            variant={priority === value ? 'default' : 'outline'}
            type="button"
        >
            {text.slice(0, 1).toUpperCase() + text.slice(1)}
        </Button>
    );
};

const TaskPriority: FC<Props> = ({ setPriority, priority }) => {
    return (
        <div className="flex gap-8 mt-4">
            <PriorityButton
                value={1}
                text="low"
                setPriority={setPriority}
                priority={priority}
            />
            <PriorityButton
                value={2}
                text="medium"
                setPriority={setPriority}
                priority={priority}
            />
            <PriorityButton
                value={3}
                text="high"
                setPriority={setPriority}
                priority={priority}
            />
        </div>
    );
};

export default TaskPriority;
