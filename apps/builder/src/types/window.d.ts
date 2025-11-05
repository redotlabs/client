/**
 * Window 객체 타입 확장
 * - 드래그앤드롭을 위한 임시 전역 상태
 */

import type { BlockTemplate } from '@/core/blocks';

declare global {
  interface Window {
    /**
     * 드래그 중인 블록 템플릿 (드래그앤드롭용)
     * TODO: Context API나 Zustand로 마이그레이션 고려
     */
    __draggedTemplate?: BlockTemplate;
  }
}

export {};
