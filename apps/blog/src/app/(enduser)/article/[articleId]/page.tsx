/* eslint-disable @next/next/no-img-element */
'use client';

import { useArticleDetail } from '@/shared/api/queries/article/detail';
import EnduserHeader from '@/shared/components/layout/enduser/header';
import { Editor, EditorProvider, Loader } from '@/shared/components/ui';
import { useParams } from 'next/navigation';

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();

  const { data: article, isLoading } = useArticleDetail(+articleId);

  if (isLoading) return <Loader />;

  return (
    <>
      <EnduserHeader />
      <main className="p-8 container mx-auto">
        <section className="mt-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {article?.title}
          </h1>
        </section>
        <section className="mt-8">
          <img
            src={article?.thumbnail ?? ''}
            alt={article?.title}
            className="w-full max-h-96 object-cover"
          />
        </section>
        <section className="mt-8">
          <div className="prose max-w-none">
            <EditorProvider
              articleId={+articleId}
              initialContent={article?.content ?? ''}
              options={{ editable: false }}
            >
              <Editor />
            </EditorProvider>
          </div>
        </section>
      </main>
    </>
  );
};

export default ArticlePage;
