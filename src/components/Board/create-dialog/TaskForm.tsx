import { TaskSchemaType } from '@/types/tasks';
import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import TaskFormField from './TaskFormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    form: UseFormReturn<TaskSchemaType>;
    handleSubmit: (data: TaskSchemaType) => void;
}

const TaskForm: FC<Props> = ({ form, handleSubmit }) => {
    return (
        <AnimatePresence>
            <Form {...form}>
                <motion.form
                    className="flex flex-col gap-2"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <TaskFormField form={form} prop="title" />
                    <TaskFormField form={form} prop="description" />

                    <Button className="self-end">Continue</Button>
                </motion.form>
            </Form>
        </AnimatePresence>
    );
};

export default TaskForm;
