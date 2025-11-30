import { cn } from '@redotlabs/utils';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';
import Header from '@/shared/components/layout/header';
import Footer from '@/shared/components/layout/footer';
import ClientQueryClientProvider from '@/shared/components/wrapper/query-client-provider';
import ClientToastProvider from '@/shared/components/wrapper/client-toast-provider';
import AuthGuard from '@/shared/components/wrapper/auth-guard';

export const metadata: Metadata = {
  title: 'Redot',
  description: 'Redot landing page',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    images: '/logo.svg',
    title: 'Redot',
    description: 'Redot landing page',
    url: 'https://redot.me',
    siteName: 'Redot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redot',
    description: 'Redot landing page',
    images: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('antialiased min-h-svh flex flex-col')}>
        <ClientQueryClientProvider>
          <ClientToastProvider>
            <ThemeProvider color="blue" font="pretendard">
              <AuthGuard>
                <Header />
                {children}
                <Footer />
              </AuthGuard>
            </ThemeProvider>
          </ClientToastProvider>
        </ClientQueryClientProvider>
      </body>
    </html>
  );
}
