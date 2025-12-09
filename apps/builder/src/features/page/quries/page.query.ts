import { useGetPage } from '@/shared/api/queries/app';
import { usePageVersions } from './page-versions.query';
import type { PageContent } from '@repo/builder/renderer';
import { usePageStore } from '../store';
import { useEffect } from 'react';

export const usePage = (pageKey?: string | null) => {
  const { initializeContentsMap, getPage, getPageKey } =
    useClientStateInitializer();

  const page = pageKey ? getPage(pageKey) : undefined;
  const { firstPage, isFetched: isFetchedVersions } = usePageVersions();

  const { data, ...otherQuery } = useGetPage(page?.id ?? firstPage?.id);

  useEffect(() => {
    if (!data || !isFetchedVersions) return;
    const key = getPageKey(data.id);
    if (!key) return;

    initializeContentsMap({ key, content: data.content });
  }, [data, pageKey, isFetchedVersions]);

  // client state가 있으면 적용
  return { ...otherQuery, data: page };
};

// client state initializer
const useClientStateInitializer = () => {
  const { storedPagesMap, storedContentsMap, setStoredContentsMap } =
    usePageStore();

  const getPageKey = (pageId: number) =>
    Object.keys(storedPagesMap).find(
      (key) => storedPagesMap[key].id === pageId
    );

  const getPage = (key: string) => storedPagesMap[key];

  const initializeContentsMap = ({
    key,
    content,
  }: {
    key: string;
    content: PageContent;
  }) => {
    const targetContent = storedContentsMap[key];
    // 이미 있으면 저장 불필요
    if (targetContent) return;
    setStoredContentsMap(key, content);
  };

  return {
    getPageKey,
    getPage,
    initializeContentsMap,
  };
};
