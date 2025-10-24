import { cn } from '@redotlabs/utils';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@redotlabs/themes';

export const metadata: Metadata = {
  title: 'Redot',
  description: 'Redot landing page',
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
    <html lang="en">
      <body className={cn('antialiased min-h-svh flex flex-col bg-white')}>
        <ThemeProvider color="blue" font="pretendard">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
