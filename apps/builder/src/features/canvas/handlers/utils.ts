/**
 * Handler Utilities
 * 핸들러들이 공통으로 사용하는 유틸리티 함수들
 */

/**
 * 이벤트에서 블록 ID 추출
 * data-block-id 속성을 가진 가장 가까운 상위 요소를 찾아서 ID를 반환
 */
export const getBlockIdFromEvent = (event: MouseEvent): string | null => {
  const target = event.target as HTMLElement;

  // data-block-id 속성 찾기
  const blockElement = target.closest('[data-block-id]');
  if (blockElement) {
    return blockElement.getAttribute('data-block-id');
  }

  return null;
};

/**
 * 키보드 수정자 키(Modifier Key) 체크
 * macOS: Cmd, Windows/Linux: Ctrl
 */
export const isModifierKey = (event: KeyboardEvent): boolean => {
  return event.metaKey || event.ctrlKey;
};
