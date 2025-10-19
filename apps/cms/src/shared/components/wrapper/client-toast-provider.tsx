'use client';

import { Toaster } from '@redotlabs/ui';
import type { PropsWithChildren } from 'react';

const ClientToastProvider = ({ children }: PropsWithChildren) => {
  const isClient = typeof window !== 'undefined';

  return (
    <>
      {children}
      <div suppressHydrationWarning>{isClient && <Toaster />}</div>
    </>
  );
};

export default ClientToastProvider;
