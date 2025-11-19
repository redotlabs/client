import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import MainLayout from '@/shared/components/layout/main-layout';

export const metadata: Metadata = {
  title: 'Redot CMS - Setting',
  description: 'Redot CMS - Setting',
};

export default async function Layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
