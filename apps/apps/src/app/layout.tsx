import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@redotlabs/utils';

export const metadata: Metadata = {
  title: 'Redot Apps',
  description: 'Redot Apps',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('antialiased min-h-svh flex flex-col bg-white')}>
        {children}
      </body>
    </html>
  );
}
