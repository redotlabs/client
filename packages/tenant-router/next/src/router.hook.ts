'use client';

import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTenantContext } from './provider';
import {
  redirect,
  RedirectType,
  usePathname,
  useRouter,
} from 'next/navigation';

export const useTenantRouter = () => {
  const { mergePath } = useTenantContext();

  const { push: _push, replace: _replace, ..._router } = useRouter();

  const push = (href: string, options?: NavigateOptions) => {
    _push(mergePath(href), options);
  };

  const replace = (href: string, options?: NavigateOptions) => {
    _replace(mergePath(href), options);
  };

  return {
    push,
    replace,
    ..._router,
  };
};

export const useTenantPathname = () => {
  const { subdomain } = useTenantContext();
  const pathname = usePathname();
  return pathname.replace(`/s/${subdomain}`, '');
};

export const useTenantRedirect = () => {
  const { mergePath } = useTenantContext();
  return (url: string, type?: RedirectType) => redirect(mergePath(url), type);
};
