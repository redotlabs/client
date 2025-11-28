import type { Site, Page } from "@/shared/types";

/**
 * 빈 페이지 생성 헬퍼
 * 기본적으로 빈 섹션 1개 포함
 */
export const createEmptyPage = (
  name: string = "Untitled Page",
  path: string = "/"
): Page => {
  const now = new Date().toISOString();
  const sectionId = crypto.randomUUID();

  return {
    id: crypto.randomUUID(),
    name,
    path,
    sections: [
      {
        id: sectionId,
        name: "Section 1",
        rows: 25,
        blocks: [],
        metadata: {
          createdAt: now,
          updatedAt: now,
        },
      },
    ],
    metadata: {
      createdAt: now,
      updatedAt: now,
    },
  };
};

/**
 * Site 초기 데이터 생성 헬퍼
 * 기본적으로 "Home" 페이지 포함
 */
export const createEmptySite = (name: string = "Untitled Site"): Site => {
  const now = new Date().toISOString();

  return {
    metadata: {
      id: crypto.randomUUID(),
      name,
      createdAt: now,
      updatedAt: now,
    },
    pages: [createEmptyPage("Home", "/")],
  };
};

/**
 * 페이지 이름으로부터 URL path 생성
 * 예: "About Us" -> "/about-us"
 */
export const generatePathFromName = (name: string): string => {
  return (
    "/" +
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  );
};

/**
 * Site에 새 페이지 추가
 */
export const addPageToSite = (site: Site, page: Page): Site => {
  return {
    ...site,
    pages: [...site.pages, page],
    metadata: {
      ...site.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Site에서 페이지 삭제
 */
export const removePageFromSite = (site: Site, pageId: string): Site => {
  return {
    ...site,
    pages: site.pages.filter((p) => p.id !== pageId),
    metadata: {
      ...site.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

/**
 * Site에서 페이지 찾기
 */
export const findPageById = (site: Site, pageId: string): Page | undefined => {
  return site.pages.find((p) => p.id === pageId);
};
