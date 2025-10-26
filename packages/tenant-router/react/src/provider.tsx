import {
  useMemo,
  useContext,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { isSubdomainInPath } from '@repo/utils';

interface TenantContext {
  subdomain: string;
  mergePath: (path: string) => string;
}

const TenantContext = createContext<TenantContext>({
  subdomain: '',
  mergePath: (path: string) => path,
});

export const TenantProvider = ({
  subdomain,
  children,
}: PropsWithChildren<Omit<TenantContext, 'mergePath'>>) => {
  const mergePath = useCallback(
    (path: string) => {
      if (
        typeof window !== 'undefined' &&
        isSubdomainInPath(window.location.pathname)
      ) {
        return `/s/${subdomain}${path}`;
      }
      return path;
    },
    [subdomain]
  );

  const value = useMemo(
    () => ({ subdomain, mergePath }),
    [subdomain, mergePath]
  );

  return <TenantContext value={value}>{children}</TenantContext>;
};

export const useTenantContext = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenantContext must be used within a TenantProvider');
  }
  return context;
};
