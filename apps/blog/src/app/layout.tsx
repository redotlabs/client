import { cn } from '@redotlabs/utils';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';
import ClientQueryClientProvider from '@/shared/components/wrapper/query-client-provider';
import ClientToastProvider from '@/shared/components/wrapper/client-toast-provider';

export const metadata: Metadata = {
  title: 'Redot Blog',
  description: 'Redot Blog',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={cn('antialiased min-h-svh flex flex-col bg-white')}>
        <ClientQueryClientProvider>
          <ThemeProvider color="blue" font="pretendard">
            <ClientToastProvider>{children}</ClientToastProvider>
          </ThemeProvider>
        </ClientQueryClientProvider>
      </body>
    </html>
  );
}
