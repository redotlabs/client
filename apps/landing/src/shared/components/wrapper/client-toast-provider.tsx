'use client';

import { Toaster } from '@redotlabs/ui';
import type { PropsWithChildren } from 'react';

const ClientToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ClientToastProvider;
