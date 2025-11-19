'use client';

import { PATH } from '@/shared/constants/routes';
import { useTenantRedirect } from '@repo/tenant-router/next';
import { RedirectType } from 'next/navigation';

export default function RootPage() {
  const redirect = useTenantRedirect();
  return redirect(PATH.dashboard, RedirectType.replace);
}
