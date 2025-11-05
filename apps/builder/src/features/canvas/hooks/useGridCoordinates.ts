import { useCallback } from "react";
import { useEditorContext } from "@/app/context/EditorContext";
import { COLUMN_WIDTH } from "@/shared/constants/editorData";

interface GridCoordinates {
  x: number;
  y: number;
}

interface MouseCoordinates {
  clientX: number;
  clientY: number;
}

interface UseGridCoordinatesReturn {
  convertToGridCoordinates: (
    mouseEvent: MouseCoordinates,
    containerElement: HTMLElement
  ) => GridCoordinates;
}

/**
 * 마우스 좌표를 그리드 좌표로 변환하는 유틸리티 훅
 */

export const useGridCoordinates = (): UseGridCoordinatesReturn => {
  const { state } = useEditorContext();

  const convertToGridCoordinates = useCallback(
    (
      mouseEvent: MouseCoordinates,
      containerElement: HTMLElement
    ): GridCoordinates => {
      const rect = containerElement.getBoundingClientRect();

      const mouseX =
        mouseEvent.clientX - rect.left + containerElement.scrollLeft;
      const mouseY = mouseEvent.clientY - rect.top + containerElement.scrollTop;

      const cellWidth = COLUMN_WIDTH;
      const cellHeight = state.gridConfig.rowHeight;

      const gridX = Math.floor(mouseX / cellWidth);
      const gridY = Math.floor(mouseY / cellHeight);

      return { x: gridX, y: gridY };
    },
    [state.gridConfig.rowHeight]
  );

  return {
    convertToGridCoordinates,
  };
};
