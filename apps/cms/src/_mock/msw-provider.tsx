'use client';

import { isServer } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';

export default function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function enableMocking() {
      if (!isServer && process.env.NODE_ENV === 'development') {
        const { server } = await import('./browser');
        await server.start();
      }
    }

    enableMocking();
  }, []);

  return <>{children}</>;
}
