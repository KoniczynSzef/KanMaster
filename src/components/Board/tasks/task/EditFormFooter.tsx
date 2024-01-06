import React, { FC } from 'react';
import * as Dialog from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskViewingMode } from '@/types/tasks';

interface Props {
    handleCompleteTask: () => Promise<void>;
    viewingMode: TaskViewingMode;
}

const EditFormFooter: FC<Props> = ({ viewingMode, handleCompleteTask }) => {
    return (
        <Dialog.DialogFooter className="flex justify-between items-center mt-8">
            <Button variant={'secondary'} className="mr-auto" type={'submit'}>
                {viewingMode === 'view' ? 'Edit' : 'Save'}
            </Button>
            <Button onClick={handleCompleteTask} type="button">
                Complete task
            </Button>
        </Dialog.DialogFooter>
    );
};

export default EditFormFooter;
