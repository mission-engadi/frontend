'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { Auth0ProviderWrapper } from '@/src/providers/auth0-provider';
import { MUIThemeProvider } from '@/src/providers/mui-theme-provider';
import { RefineProvider } from '@/src/providers/refine-provider';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWrapper>
        <MUIThemeProvider>
          <RefineProvider>{children}</RefineProvider>
        </MUIThemeProvider>
      </Auth0ProviderWrapper>
    </QueryClientProvider>
  );
}
