import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Navbar from '@/components/Navbar/Navbar';
import SessionProvider from '@/providers/SessionProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'KanMaster',
    description: 'KanMaster - Kanban Board for everyone',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Toaster richColors />
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
