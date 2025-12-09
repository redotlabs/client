import { useGetPageVersions } from '@/shared/api/queries/app';
import { usePageStore } from '../store';
import { useEffect } from 'react';
import type { PageVersion } from '@/shared/api/services/app';
import { uuidv4 } from '@repo/utils';

export const usePageVersions = (props?: { enabled?: boolean }) => {
  const query = useGetPageVersions();
  const { selectedVersion } = usePageStore();
  const { initializePagesMap } = useClientStateInitializer();

  const currentVersion = query?.data?.content?.[selectedVersion];
  const firstPage = currentVersion?.pages?.[0];

  // ! Client state 초기화
  useEffect(() => {
    if (!currentVersion || !props?.enabled) return;
    initializePagesMap(currentVersion);
  }, [currentVersion]);

  return {
    ...query,
    firstPage,
    currentVersion,
  };
};

// client state initializer
const useClientStateInitializer = () => {
  const { storedPagesMap, setCurrentPageKey, setStoredPagesMap } =
    usePageStore();

  const isInitialized = Object.keys(storedPagesMap).length > 0;

  /**
   * content 없이 페이지 정보만 저장
   */
  const initializePagesMap = (pageVersion: PageVersion) => {
    if (isInitialized) return;
    if (pageVersion.pages.length === 0) return;
    pageVersion.pages.forEach((page, index) => {
      const key = uuidv4();
      // 첫 페이지로 키 초기화
      if (index === 0) {
        setCurrentPageKey(key);
      }
      setStoredPagesMap(key, { key, ...page });
    });
  };

  return {
    isInitialized,
    initializePagesMap,
  };
};
