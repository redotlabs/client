import { PageContent, PageRenderer } from '@repo/builder/renderer';
import { getPage } from '@/shared/api/services/app';
import { safeParseJson } from '@repo/utils';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = await getPage('/' + (slug ? slug.join('/') : ''));
  const content = safeParseJson<PageContent>(page.content);

  if (!content) {
    return notFound();
  }

  return <PageRenderer content={content} />;
}
