import type { EditorAction } from '@/core/actions';
import type { EditorState } from '@/core/state';

/**
 * Handler Context
 * 핸들러가 접근할 수 있는 컨텍스트
 */
export interface HandlerContext {
  state: EditorState;
  dispatch: (action: EditorAction) => void;
}

/**
 * Base Event Handler
 * 모든 이벤트 핸들러의 기본 인터페이스
 */
export interface EventHandler<E = Event> {
  name: string;
  handle: (event: E, context: HandlerContext) => void;
}

export type KeyboardEventHandler = EventHandler<KeyboardEvent>;

export type MouseEventHandler = EventHandler<MouseEvent>;

export interface DragEventHandler {
  name: string;
  onDragStart: (event: MouseEvent, context: HandlerContext, blockId: string) => void;
  onDragMove: (event: MouseEvent, context: HandlerContext) => void;
  onDragEnd: (event: MouseEvent, context: HandlerContext) => void;
}

export type ResizeDirection = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

export interface ResizeEventHandler {
  name: string;
  onResizeStart: (
    event: MouseEvent,
    context: HandlerContext,
    blockId: string,
    direction: ResizeDirection
  ) => void;
  onResizeMove: (event: MouseEvent, context: HandlerContext) => void;
  onResizeEnd: (event: MouseEvent, context: HandlerContext) => void;
}

export type SelectionEventHandler = EventHandler<MouseEvent>;
