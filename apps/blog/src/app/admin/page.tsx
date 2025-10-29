'use client';

import AdminHeader from '@/shared/components/layout/admin/header';
import React, { Fragment } from 'react';
import CreateArticleButton from './ui/create-article-button';
import { useAdminArticles } from '@/shared/api/queries/article/list';
import { ArticleCard, Loader } from '@/shared/components/ui';
import Link from 'next/link';
import { PATH } from '@/shared/constants/routes';

const AdminMainPage = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAdminArticles();

  const noData = !isLoading && !isFetched && data?.pages[0]?.data?.length === 0;

  return (
    <>
      <AdminHeader />
      <main className="p-8 container mx-auto">
        <p className="text-center text-gray-500">
          안녕하세요? Redot 여러분들을 위한 블로그 히든 페이지에요. 환영합니다.
        </p>
        <section className="mt-8 flex justify-end">
          <CreateArticleButton />
        </section>
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading && <Loader />}
            {isFetched &&
              data?.pages?.map((group, i) => (
                <Fragment key={i}>
                  {group?.data?.map((article) => (
                    <Link
                      href={PATH.admin.article.detail(article.id)}
                      key={article.id}
                    >
                      <ArticleCard key={article.id} article={article} />
                    </Link>
                  ))}
                </Fragment>
              ))}
          </div>

          {noData && (
            <div className="text-center text-gray-500">
              작성된 아티클이 없습니다.
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default AdminMainPage;
