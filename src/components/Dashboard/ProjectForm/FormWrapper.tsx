import React, { FC } from 'react';
import ProjectForm from './ProjectForm';

interface Props {}

const FormWrapper: FC<Props> = () => {
    return (
        <section className="max-w-3xl flex flex-col gap-4 mx-4 md:mx-auto p-8 rounded">
            <h3 className="text-3xl font-bold flex gap-4">
                <span className=" text-transparent bg-clip-text bg-gradient-to-r from-orange-400 dark:from-paletteYellow dark:to-paletteLighterRed to-paletteLighterRed">
                    Empower Your Ideas
                </span>
                🚀
            </h3>

            <ProjectForm />
        </section>
    );
};

export default FormWrapper;
