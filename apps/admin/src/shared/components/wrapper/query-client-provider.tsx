import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 0,
        // suspense on
        experimental_prefetchInRender: true,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });

const RedotQueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = makeQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default RedotQueryClientProvider;
