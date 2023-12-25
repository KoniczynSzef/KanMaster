import TaskDatePicker from './TaskDatePicker';
import { Button } from '@/components/ui/button';
import * as Dialog from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    createTask: () => void;
}

const schema = z.object({
    title: z.string().min(3).max(55),
    description: z.string().min(3).max(255).optional(),
    deadline: z.date().default(() => new Date(new Date().getTime() + 86400000)),
});

const CreateTask: FC<Props> = () => {
    const [step, setStep] = React.useState(1);

    const form = useForm<z.infer<typeof schema>>({
        mode: 'all',
        resolver: zodResolver(schema),
    });

    const handleNextStep = () => {
        setStep((prev) => prev + 1);

        if (step === 3) {
            console.log(form.getValues());
        }
    };

    return (
        <Dialog.Dialog>
            <Dialog.DialogTrigger asChild>
                <Button className="ml-auto">Create Task</Button>
            </Dialog.DialogTrigger>

            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>Create Task</Dialog.DialogTitle>
                    <Dialog.DialogClose />
                </Dialog.DialogHeader>

                <Form {...form}>
                    <form action="" className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={(field) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Task title..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={(field) => (
                                <FormItem>
                                    <FormLabel>Task Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Task description..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col mt-4">
                            <Label htmlFor="Deadline">Set Deadline</Label>
                            <TaskDatePicker />
                        </div>

                        <Button
                            className="self-end"
                            type="button"
                            onClick={handleNextStep}
                        >
                            Continue
                        </Button>
                    </form>
                </Form>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
};

export default CreateTask;
