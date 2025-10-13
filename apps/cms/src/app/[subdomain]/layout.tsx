import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';
import MSWProvider from '@/_mock/msw-provider';
import ClientQueryClientProvider from '@/shared/components/wrapper/query-client-provider';
import ClientToastProvider from '@/shared/components/wrapper/client-toast-provider';
import AuthGuard from '@/shared/components/wrapper/auth-guard';
import type { PropsWithChildren } from 'react';
import { getCustomer } from '@/shared/api/services/customer';

export const metadata: Metadata = {
  title: 'Redot CMS',
  description: 'Redot CMS',
};

export default async function CustomerRootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ subdomain: string }> }>) {
  const { subdomain } = await params;
  const customer = await getCustomer(subdomain);

  return (
    <ClientQueryClientProvider>
      <ThemeProvider color={customer.color} font={customer.font}>
        <MSWProvider>
          <ClientToastProvider>
            <AuthGuard>
              <main>{children}</main>
            </AuthGuard>
          </ClientToastProvider>
        </MSWProvider>
      </ThemeProvider>
    </ClientQueryClientProvider>
  );
}
