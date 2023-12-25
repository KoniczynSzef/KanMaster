'use client';

import React, { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

interface Props {
    children: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
    const [client] = React.useState(new QueryClient());
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

export default QueryProvider;
