import { usePageStore } from './store';

export const usePageStateManager = () => {
  const {
    currentPageKey,
    storedContentsMap,
    storedPagesMap,
    clearStoredPagesMap,
    clearStoredContentsMap,
    clearAddedKeys,
  } = usePageStore();

  const pages = Object.values(storedPagesMap);
  const paths = pages.map((page) => page.path);
  const currentContent = currentPageKey
    ? storedContentsMap[currentPageKey]
    : null;
  const currentPage = currentPageKey ? storedPagesMap[currentPageKey] : null;

  const clearAllStates = () => {
    clearStoredPagesMap();
    clearStoredContentsMap();
    clearAddedKeys();
  };

  return { pages, paths, currentContent, currentPage, clearAllStates };
};
