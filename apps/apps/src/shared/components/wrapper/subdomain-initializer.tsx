'use client';

import { initializeSubdomainHeader } from '@/shared/api/instance';
import { useEffect, type PropsWithChildren } from 'react';

const SubdomainInitializer = ({
  subdomain,
  children,
}: PropsWithChildren<{ subdomain: string }>) => {
  initializeSubdomainHeader(subdomain);

  useEffect(() => {
    initializeSubdomainHeader(subdomain);
  }, [subdomain]);

  return <>{children}</>;
};

export default SubdomainInitializer;
