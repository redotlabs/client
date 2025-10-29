'use client';

import { Toaster } from '@redotlabs/ui';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

const ClientToastProvider = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {children}
      {isClient && <Toaster />}
    </>
  );
};

export default ClientToastProvider;
