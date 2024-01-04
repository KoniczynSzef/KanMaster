import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
    title: string;
    quickDescription?: string;
    link?: string;
    href: string;
}

const FormDescription: FC<Props> = ({
    title,
    quickDescription,
    link,
    href,
}) => {
    return (
        <article>
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="text-muted-foreground mt-2 flex gap-2">
                {quickDescription ? <span>{quickDescription}</span> : null}
                {link ? (
                    <Link
                        href={href}
                        className="text-purple-600 hover:text-purple-700 dark:hover:text-purple-500 transition duration-150"
                    >
                        {link}
                    </Link>
                ) : null}
            </p>
        </article>
    );
};

export default FormDescription;
