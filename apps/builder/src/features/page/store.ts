import type { PageContent } from '@repo/builder/renderer';
import type { AppPage } from '@repo/types';
import { create } from 'zustand';

const INITIAL_VERSION_INDEX = 0;

export type TempPage = Omit<
  AppPage,
  'content' | 'createdAt' | 'updatedAt' | 'id'
> & {
  id?: number;
  key: string;
};
export type PageKey = TempPage['key'];

interface State {
  selectedVersion: number;
  /**
   * @param id - 페이지 id
   * @param tempId - 페이지 tempId(임시 식별자 = 추가된 페이지에 적용)
   */
  currentPageKey: PageKey | null;
  /**
   * 페이지 정보 저장
   * 페이지 정보 fetch시 추가
   * editor로 수정 후 저장 트리거시 업데이트
   */
  storedPagesMap: Record<PageKey, TempPage>;
  /**
   * pages info랑 content를 따로 관리할 거임
   */
  storedContentsMap: Record<PageKey, PageContent>;
  /**
   * 변경된 페이지 정보
   * ! 페이지 삭제할 때 addedKeys에서도 제거해야함!!
   */
  addedKeys: Set<PageKey>;
}

interface Actions {
  setSelectedVersion: (version: number) => void;
  setCurrentPageKey: (key: PageKey) => void;
  setStoredPagesMap: (key: PageKey, page: TempPage) => void;
  removeStoredPagesMap: (key: PageKey) => void;
  setStoredContentsMap: (key: PageKey, content: PageContent) => void;
  clearStoredPagesMap: () => void;
  clearStoredContentsMap: () => void;
  appendAddedKeys: (key: PageKey) => void;
  removeAddedKeys: (key: PageKey) => void;
  clearAddedKeys: () => void;
}

export const usePageStore = create<State & Actions>((set) => ({
  selectedVersion: INITIAL_VERSION_INDEX,
  setSelectedVersion: (version) => set({ selectedVersion: version }),
  // current page key
  currentPageKey: null,
  setCurrentPageKey: (key) => set({ currentPageKey: key }),
  // stored pages map
  storedPagesMap: {},
  setStoredPagesMap: (key, page) =>
    set(({ storedPagesMap }) => ({
      storedPagesMap: { ...storedPagesMap, [key]: page },
    })),
  removeStoredPagesMap: (key) =>
    set(({ storedPagesMap }) => {
      const { [key]: _, ...rest } = storedPagesMap;
      return { storedPagesMap: rest };
    }),
  clearStoredPagesMap: () => set({ storedPagesMap: {} }),
  // stored contents map
  storedContentsMap: {},
  setStoredContentsMap: (key, content) =>
    set(({ storedContentsMap }) => ({
      storedContentsMap: { ...storedContentsMap, [key]: content },
    })),
  clearStoredContentsMap: () => set({ storedContentsMap: {} }),
  // added keys
  addedKeys: new Set(),
  appendAddedKeys: (key: PageKey) =>
    set(({ addedKeys }) => ({ addedKeys: addedKeys.add(key) })),
  removeAddedKeys: (key: PageKey) =>
    set(({ addedKeys }) => ({
      addedKeys: new Set([...addedKeys].filter((k) => k !== key)),
    })),
  clearAddedKeys: () => set({ addedKeys: new Set() }),
}));
