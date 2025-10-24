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
  /**
   * 핸들러 이름
   */
  name: string;

  /**
   * 이벤트 처리
   */
  handle: (event: E, context: HandlerContext) => void;

  /**
   * 핸들러 활성화 여부
   */
  enabled?: boolean;
}

/**
 * Keyboard Event Handler
 */
export type KeyboardEventHandler = EventHandler<KeyboardEvent>;

/**
 * Mouse Event Handler
 */
export type MouseEventHandler = EventHandler<MouseEvent>;

/**
 * Drag Event Handler
 */
export interface DragEventHandler extends EventHandler<MouseEvent> {
  onDragStart?: (event: MouseEvent, context: HandlerContext) => void;
  onDragMove?: (event: MouseEvent, context: HandlerContext) => void;
  onDragEnd?: (event: MouseEvent, context: HandlerContext) => void;
}

/**
 * Selection Event Handler
 */
export type SelectionEventHandler = EventHandler<MouseEvent>;
