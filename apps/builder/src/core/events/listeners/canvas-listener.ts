import type {
  KeyboardEventHandler,
  MouseEventHandler,
  DragEventHandler,
  HandlerContext,
} from '@/core/events/handlers';

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

  private wasDragging = false;

  constructor(element: HTMLElement, context: HandlerContext) {
    this.element = element;
    this.context = context;
  }

  registerKeyboardHandler(handler: KeyboardEventHandler): void {
    this.keyboardHandlers.push(handler);
  }

  registerMouseHandler(handler: MouseEventHandler): void {
    this.mouseHandlers.push(handler);
  }

  registerDragHandler(handler: DragEventHandler): void {
    this.dragHandlers.push(handler);
  }

  start(): void {
    document.addEventListener('keydown', this.handleKeyDown);
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  stop(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    this.keyboardHandlers.forEach((handler) => {
      handler.handle(event, this.context);
    });
  };

  private handleClick = (event: MouseEvent): void => {
    if (this.wasDragging) {
      this.wasDragging = false;
      return;
    }

    this.mouseHandlers.forEach((handler) => {
      handler.handle(event, this.context);
    });
  };

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

  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.dragState.isMouseDown) return;

    this.dragState.currentX = event.clientX;
    this.dragState.currentY = event.clientY;

    if (!this.dragState.isDragging) {
      const deltaX = Math.abs(event.clientX - this.dragState.startX);
      const deltaY = Math.abs(event.clientY - this.dragState.startY);

      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        this.dragState.isDragging = true;

        this.dragHandlers.forEach((handler) => {
          if (handler.onDragStart) {
            handler.onDragStart(event, this.context);
          }
        });
      }
    } else {
      this.dragHandlers.forEach((handler) => {
        if (handler.onDragMove) {
          handler.onDragMove(event, this.context);
        }
      });
    }
  };

  private handleMouseUp = (event: MouseEvent): void => {
    const wasDragging = this.dragState.isDragging;

    if (wasDragging) {
      this.dragHandlers.forEach((handler) => {
        if (handler.onDragEnd) {
          handler.onDragEnd(event, this.context);
        }
      });

      this.wasDragging = true;
    }

    this.dragState.isMouseDown = false;
    this.dragState.isDragging = false;
  };

  getDragState(): Readonly<DragState> {
    return { ...this.dragState };
  }
}
