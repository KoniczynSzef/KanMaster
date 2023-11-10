'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import React from 'react';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <section className="p-24">
            <h3>
                Error message:{' '}
                <span className="text-card-foreground">{error.message}</span>
            </h3>
            <Button>Try again!</Button>
        </section>
    );
}
