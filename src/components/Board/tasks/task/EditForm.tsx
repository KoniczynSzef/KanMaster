import * as Dialog from '@/components/ui/dialog';
import { TaskEditionSchemaType } from '@/types/tasks';
import { Task } from '@prisma/client';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import EditFormField from './EditFormField';

interface Props {
    TASK: Task;
    setTASK: React.Dispatch<React.SetStateAction<Task>>;
    form: UseFormReturn<TaskEditionSchemaType>;
}

const EditForm: FC<Props> = ({ setTASK, form }) => {
    return (
        <>
            <Dialog.DialogHeader>
                <div>
                    <EditFormField form={form} prop="title" setTASK={setTASK} />
                </div>
            </Dialog.DialogHeader>

            <div className="mt-4">
                <EditFormField
                    form={form}
                    prop="description"
                    setTASK={setTASK}
                />
            </div>
        </>
    );
};

export default EditForm;
