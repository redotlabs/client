import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';
import ClientToastProvider from '@/shared/components/wrapper/client-toast-provider';
import { type PropsWithChildren } from 'react';
import { getAppInfo } from '@/shared/api/services/app';
import { initializeSubdomainHeader } from '@/shared/api/instance';
import { notFound } from 'next/navigation';
import { TenantProvider } from '@repo/tenant-router/next';
import SubdomainInitializer from '@/shared/components/wrapper/subdomain-initializer';

export const metadata: Metadata = {
  title: 'Redot Apps',
  description: 'Redot Apps',
};

export default async function AppRootLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ subdomain: string }>;
}>) {
  const { subdomain } = await params;
  initializeSubdomainHeader(subdomain);
  const appInfo = await getAppInfo().catch((error) => {
    console.error(error);
    return notFound();
  });

  return (
    <SubdomainInitializer subdomain={subdomain}>
      <TenantProvider subdomain={subdomain}>
        <ThemeProvider
          color={appInfo.styleInfo?.color}
          font={appInfo.styleInfo?.font}
        >
          <ClientToastProvider>
            <main>{children}</main>
          </ClientToastProvider>
        </ThemeProvider>
      </TenantProvider>
    </SubdomainInitializer>
  );
}
