import React, { FC } from 'react';
import ProjectForm from './ProjectForm';

interface Props {}

const FormWrapper: FC<Props> = () => {
    return (
        <section className="max-w-3xl flex flex-col gap-4 mx-4 md:mx-auto my-24 p-8 rounded">
            <h3 className="text-3xl font-bold flex gap-4">
                <span className=" text-transparent bg-clip-text bg-gradient-to-r from-orange-400 dark:from-paletteYellow dark:to-paletteLighterRed to-paletteLighterRed">
                    Empower Your Ideas
                </span>
                🚀
            </h3>
            {/* <p className="max-w-sm mt-2">
                Let&apos;s start with the project title and a brief description.
                It&apos;s the first step towards your goal.
            </p> */}

            <ProjectForm />
        </section>
    );
};

export default FormWrapper;
