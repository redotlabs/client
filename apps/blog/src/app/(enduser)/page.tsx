'use client';

import { useArticles } from '@/shared/api/queries/article/list';
import EnduserHeader from '@/shared/components/layout/enduser/header';
import { ArticleCard, Loader } from '@/shared/components/ui';
import { PATH } from '@/shared/constants/routes';
import Link from 'next/link';
import React, { Fragment } from 'react';

const MainPage = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useArticles();

  if (isLoading) return <Loader />;

  const noData = !isLoading && !isFetched && data?.pages[0]?.data?.length === 0;

  return (
    <>
      <EnduserHeader />
      <main className="p-8 container mx-auto">
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading && <Loader />}
            {isFetched &&
              data?.pages?.map((group, i) => (
                <Fragment key={i}>
                  {group?.data?.map((article) => (
                    <Link
                      href={PATH.article.detail(article.id)}
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

export default MainPage;
