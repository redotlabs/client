import type { HandlerContext } from '../handlers/types';
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  DragEventHandler,
} from '../handlers/types';
import { throttle } from './utils';

/**
 * Canvas Listener Configuration
 */
export interface CanvasListenerConfig {
  throttleDelay?: number; // 기본값: 16ms (약 60fps)
  enableKeyboard?: boolean;
  enableMouse?: boolean;
  enableDrag?: boolean;
}

/**
 * Drag State
 */
interface DragState {
  isMouseDown: boolean;
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

/**
 * 드래그로 인식할 최소 이동 거리 (px)
 */
const DRAG_THRESHOLD = 5;

/**
 * Canvas Event Listener
 * 캔버스의 모든 이벤트를 수신하고 적절한 핸들러로 전달
 */
export class CanvasListener {
  private element: HTMLElement;
  private context: HandlerContext;
  private config: Required<CanvasListenerConfig>;

  private keyboardHandlers: KeyboardEventHandler[] = [];
  private mouseHandlers: MouseEventHandler[] = [];
  private dragHandlers: DragEventHandler[] = [];

  private dragState: DragState = {
    isMouseDown: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  };

  // 드래그가 방금 끝났는지 추적 (click 이벤트 무시용)
  private wasDragging = false;

  // Throttled handlers
  private throttledMouseMove: ((event: MouseEvent) => void) | null = null;

  constructor(
    element: HTMLElement,
    context: HandlerContext,
    config: CanvasListenerConfig = {}
  ) {
    this.element = element;
    this.context = context;
    this.config = {
      throttleDelay: config.throttleDelay ?? 16,
      enableKeyboard: config.enableKeyboard ?? true,
      enableMouse: config.enableMouse ?? true,
      enableDrag: config.enableDrag ?? true,
    };

    this.throttledMouseMove = throttle(
      this.handleMouseMove,
      this.config.throttleDelay
    );
  }

  /**
   * 핸들러 등록
   */
  registerKeyboardHandler(handler: KeyboardEventHandler): void {
    this.keyboardHandlers.push(handler);
  }

  registerMouseHandler(handler: MouseEventHandler): void {
    this.mouseHandlers.push(handler);
  }

  registerDragHandler(handler: DragEventHandler): void {
    this.dragHandlers.push(handler);
  }

  /**
   * 리스너 시작
   */
  start(): void {
    if (this.config.enableKeyboard) {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    if (this.config.enableMouse) {
      this.element.addEventListener('click', this.handleClick);
    }

    if (this.config.enableDrag) {
      this.element.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.throttledMouseMove!);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  /**
   * 리스너 정지
   */
  stop(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.throttledMouseMove!);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Keyboard Event Handler
   */
  private handleKeyDown = (event: KeyboardEvent): void => {
    this.keyboardHandlers.forEach((handler) => {
      if (handler.enabled !== false) {
        handler.handle(event, this.context);
      }
    });
  };

  /**
   * Click Event Handler
   */
  private handleClick = (event: MouseEvent): void => {
    // 드래그가 방금 끝났으면 클릭 이벤트 무시
    if (this.wasDragging) {
      this.wasDragging = false;
      return;
    }

    // 클릭 이벤트 처리
    this.mouseHandlers.forEach((handler) => {
      if (handler.enabled !== false) {
        handler.handle(event, this.context);
      }
    });
  };

  /**
   * Mouse Down Event Handler (Drag Start)
   */
  private handleMouseDown = (event: MouseEvent): void => {
    this.dragState = {
      isMouseDown: true,
      isDragging: false,
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
    };
  };

  /**
   * Mouse Move Event Handler (Drag Move)
   */
  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.dragState.isMouseDown) return;

    this.dragState.currentX = event.clientX;
    this.dragState.currentY = event.clientY;

    // 드래그 시작 여부 판단 (일정 거리 이상 이동 시)
    if (!this.dragState.isDragging) {
      const deltaX = Math.abs(event.clientX - this.dragState.startX);
      const deltaY = Math.abs(event.clientY - this.dragState.startY);

      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        this.dragState.isDragging = true;

        // 드래그 시작 이벤트
        this.dragHandlers.forEach((handler) => {
          if (handler.enabled !== false && handler.onDragStart) {
            handler.onDragStart(event, this.context);
          }
        });
      }
    } else {
      // 드래그 중 이동 이벤트
      this.dragHandlers.forEach((handler) => {
        if (handler.enabled !== false && handler.onDragMove) {
          handler.onDragMove(event, this.context);
        }
      });
    }
  };

  /**
   * Mouse Up Event Handler (Drag End or Click)
   */
  private handleMouseUp = (event: MouseEvent): void => {
    const wasDragging = this.dragState.isDragging;

    if (wasDragging) {
      // 드래그 종료
      this.dragHandlers.forEach((handler) => {
        if (handler.enabled !== false && handler.onDragEnd) {
          handler.onDragEnd(event, this.context);
        }
      });

      // 드래그가 끝났음을 표시 (다음 click 이벤트 무시용)
      this.wasDragging = true;
    }

    // 상태 초기화
    this.dragState.isMouseDown = false;
    this.dragState.isDragging = false;
  };

  /**
   * 드래그 상태 조회
   */
  getDragState(): Readonly<DragState> {
    return { ...this.dragState };
  }
}
