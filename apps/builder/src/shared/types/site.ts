import type { Section } from "./section";

/**
 * Site Metadata
 * 사이트 전체 메타 정보
 */
export interface SiteMetadata {
  id: string;
  name: string;
  description?: string;
  favicon?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Page
 * 사이트 내 하나의 페이지
 */
export interface Page {
  id: string;
  name: string;
  path: string;
  sections: Section[];
  metadata?: {
    title?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Site
 * 하나의 웹사이트를 표현하는 최상위 데이터 구조
 * - 다중 페이지 지원
 * - 향후 글로벌 스타일, SEO 설정 등 확장 가능
 */
export interface Site {
  metadata: SiteMetadata;
  pages: Page[];
}
