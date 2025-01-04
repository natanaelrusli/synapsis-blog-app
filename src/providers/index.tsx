'use client';

import AntdConfigProvider from '@/providers/AntdConfigProviders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider>{children}</AntdConfigProvider>
    </QueryClientProvider>
  );
}
