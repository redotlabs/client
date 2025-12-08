/**
 * 핸들러들이 공통으로 사용할 유틸리티 함수
 */

/**
 * 이벤트에서 블록 ID 추출
 */
export const getBlockIdFromEvent = (event: MouseEvent): string | null => {
  const target = event.target as HTMLElement;

  const blockElement = target.closest('[data-block-id]');
  if (blockElement) {
    return blockElement.getAttribute('data-block-id');
  }

  return null;
};
