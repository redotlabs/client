'use client';

import { PageContent } from '@repo/builder/renderer';
import { PageRenderer } from '@repo/builder/renderer';

const ClientRenderer = ({ content }: { content: PageContent }) => {
  return <PageRenderer content={content} />;
};

export default ClientRenderer;
