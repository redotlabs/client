import type {
  KeyboardEventHandler,
  MouseEventHandler,
  DragEventHandler,
  DropEventHandler,
  HandlerContext,
} from "@/core/events/handlers";

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
  private dropHandlers: DropEventHandler[] = [];

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

  registerDropHandler(handler: DropEventHandler): void {
    this.dropHandlers.push(handler);
  }

  start(): void {
    document.addEventListener("keydown", this.handleKeyDown);
    this.element.addEventListener("click", this.handleClick);
    this.element.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    this.element.addEventListener("dragover", this.handleDragOver);
    this.element.addEventListener("drop", this.handleDrop);
    this.element.addEventListener("dragleave", this.handleDragLeave);
  }

  stop(): void {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.element.removeEventListener("click", this.handleClick);
    this.element.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);

    this.element.removeEventListener("dragover", this.handleDragOver);
    this.element.removeEventListener("drop", this.handleDrop);
    this.element.removeEventListener("dragleave", this.handleDragLeave);
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
    // 블록 요소 감지
    const target = event.target as HTMLElement;
    const blockElement = target.closest('[data-block-id]');
    const blockId = blockElement?.getAttribute('data-block-id');

    // 드래그 가능한 요소인지 확인
    const isDraggable = target.closest('[data-draggable]');
    const isResizeHandle = target.closest('[data-resize-handle]');

    // 드래그 가능한 블록을 클릭했을 때 dragHandler 시작
    if (blockId && isDraggable && !isResizeHandle) {
      this.dragHandlers.forEach((handler) => {
        handler.onDragStart(event, this.context, blockId);
      });
    }

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

        // DragEventHandler는 CanvasListener에서 호출하지 않음
        // SelectableBlock에서 직접 dragHandler.onDragStart() 호출
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

  private handleDragOver = (event: DragEvent): void => {
    this.dropHandlers.forEach((handler) => {
      handler.onDragOver(event, this.context);
    });
  };

  private handleDrop = (event: DragEvent): void => {
    this.dropHandlers.forEach((handler) => {
      handler.onDrop(event, this.context);
    });
  };

  private handleDragLeave = (event: DragEvent): void => {
    this.dropHandlers.forEach((handler) => {
      handler.onDragLeave(event, this.context);
    });
  };
}
