import ToggleTheme from '@/components/ToggleTheme';
import React from 'react';

export default function Home() {
    return (
        <main className="p-24">
            <h1 className="font-bold text-4xl">Hello World!</h1>
            <ToggleTheme />
        </main>
    );
}
