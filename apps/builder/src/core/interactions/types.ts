import type { BlockPosition, BlockSize } from "@/shared/types";
import type { ResizeDirection } from "../events/handlers/types";

/**
 * Interaction Type
 * 사용자가 현재 진행 중인 인터랙션의 종류
 */
export type InteractionType = "drag" | "resize" | null;

/**
 * Drag Interaction State
 * 드래그 중간 상태 (Preview용)
 */
export interface DragInteractionState {
  blockId: string;
  startPosition: BlockPosition;
  currentPosition: BlockPosition; // 현재 마우스 위치 기반 위치
  previewPosition: BlockPosition; // 그리드에 스냅된 미리보기 위치
  startMousePosition: { x: number; y: number };
}

/**
 * Resize Interaction State
 * 리사이즈 중간 상태 (Preview용)
 */
export interface ResizeInteractionState {
  blockId: string;
  direction: ResizeDirection;
  startPosition: BlockPosition;
  startSize: BlockSize;
  currentSize: BlockSize; // 현재 마우스 위치 기반 크기
  previewSize: BlockSize; // 그리드에 스냅된 미리보기 크기
  startMousePosition: { x: number; y: number };
}

/**
 * Interaction State
 * Handler 레벨에서 관리하는 중간 상태
 *
 * 이 상태는 실제 EditorState에 반영되지 않으며,
 * 인터랙션이 완료될 때만 Action을 통해 데이터에 반영됨
 */
export interface InteractionState {
  type: InteractionType;
  drag: DragInteractionState | null;
  resize: ResizeInteractionState | null;
}

/**
 * Initial Interaction State
 */
export const createInitialInteractionState = (): InteractionState => ({
  type: null,
  drag: null,
  resize: null,
});
