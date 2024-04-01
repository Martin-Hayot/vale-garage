"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryClientProviderProps {
    children: React.ReactNode;
}

const client = new QueryClient();

const QueryProvider = ({ children }: QueryClientProviderProps) => {
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

export default QueryProvider;
