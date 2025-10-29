import type { DragEventHandler, HandlerContext } from './types';

/**
 * Drag Handler
 * 블록 드래그를 처리하는 핸들러
 */
export const dragHandler: DragEventHandler = {
  name: 'drag',

  onDragStart: (event: MouseEvent, context: HandlerContext) => {
    // TODO: 드래그 시작 처리
    // - 드래그할 블록 식별
    // - 드래그 시작 위치 저장
    // - preview 상태로 변경
    console.log('Drag start', event, context);
  },

  onDragMove: (event: MouseEvent, context: HandlerContext) => {
    // TODO: 드래그 중 처리
    // - 마우스 이동에 따라 블록 위치 계산
    // - preview 액션으로 임시 위치 업데이트
    // - 그리드 스냅 처리
    console.log('Drag move', event, context);
  },

  onDragEnd: (event: MouseEvent, context: HandlerContext) => {
    // TODO: 드래그 종료 처리
    // - 최종 위치 계산
    // - commit 액션으로 실제 상태 업데이트
    // - preview 상태 초기화
    console.log('Drag end', event, context);
  },
};
