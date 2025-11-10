import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';
import ClientQueryClientProvider from '@/shared/components/wrapper/query-client-provider';
import ClientToastProvider from '@/shared/components/wrapper/client-toast-provider';
import AuthGuard from '@/shared/components/wrapper/auth-guard';
import type { PropsWithChildren } from 'react';
import { getCustomer } from '@/shared/api/services/customer';
import { initializeSubdomainHeader } from '@/shared/api/instance';
import { redirect } from 'next/navigation';
import { PATH } from '@/shared/constants/routes';
import { TenantProvider } from '@repo/tenant-router/next';
import SubdomainInitializer from '@/shared/components/wrapper/subdomain-initializer';

export const metadata: Metadata = {
  title: 'Redot CMS',
  description: 'Redot CMS',
};

export default async function CustomerRootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ subdomain: string }> }>) {
  const { subdomain } = await params;
  initializeSubdomainHeader(subdomain);
  const customer = await getCustomer().catch((error) => {
    console.error(error);
    return redirect(PATH.notFound);
  });

  return (
    <SubdomainInitializer subdomain={subdomain}>
      <TenantProvider subdomain={subdomain}>
        <ClientQueryClientProvider>
          <ThemeProvider
            color={customer.styleInfo?.color}
            font={customer.styleInfo?.font}
          >
            <ClientToastProvider>
              <AuthGuard>
                <main>{children}</main>
              </AuthGuard>
            </ClientToastProvider>
          </ThemeProvider>
        </ClientQueryClientProvider>
      </TenantProvider>
    </SubdomainInitializer>
  );
}
