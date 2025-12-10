'use client';

import { useArticles } from '@/shared/api/queries/article/list';
import EnduserHeader from '@/shared/components/layout/enduser/header';
import { ArticleCard, Loader } from '@/shared/components/ui';
import { PATH } from '@/shared/constants/routes';
import Link from 'next/link';
import { Fragment } from 'react';
import Loading from '../loading';
import NoContent from './_ui/no-content';
import Footer from '@/shared/components/layout/footer';

const MainPage = () => {
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useArticles();

  if (isLoading) return <Loading />;

  const noData = !isLoading && isFetched && data?.pages[0]?.data?.length === 0;

  return (
    <>
      <EnduserHeader />
      <main className="flex-1 p-8 container mx-auto flex flex-col">
        <section className="mt-8 flex-1 flex flex-col">
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

          {noData && <NoContent />}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
