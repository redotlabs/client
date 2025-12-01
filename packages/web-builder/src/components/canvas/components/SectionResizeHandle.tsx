import { useEditorContext } from "@/app/context/EditorContext";
import { resizeSection, setSectionResizing } from "@/core/actions";
import { useState, useEffect, useCallback } from "react";

interface SectionResizeHandleProps {
  sectionId: string;
  currentRows?: number;
  minRows: number;
}

export const SectionResizeHandle = ({
  sectionId,
  currentRows,
  minRows,
}: SectionResizeHandleProps) => {
  const { state, dispatch } = useEditorContext();
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startRows, setStartRows] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      setStartY(e.clientY);
      setStartRows(currentRows || minRows);
      dispatch(setSectionResizing(true));
    },
    [currentRows, minRows, dispatch]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const deltaRows = Math.round(deltaY / state.gridConfig.rowHeight);

      const newRows = Math.max(startRows + deltaRows, minRows);

      dispatch(resizeSection(sectionId, newRows));
    },
    [
      isDragging,
      startY,
      startRows,
      sectionId,
      dispatch,
      minRows,
      state.gridConfig.rowHeight,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dispatch(setSectionResizing(false));
  }, [dispatch]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`absolute bottom-4 right-4 flex flex-col items-center gap-1 p-2 rounded-lg transition-all z-20 cursor-ns-resize ${
        isDragging
          ? "bg-blue-500 shadow-lg scale-110"
          : "bg-gray-200 hover:bg-blue-400 hover:shadow-md"
      }`}
      onMouseDown={handleMouseDown}
      title={`Drag to adjust section rows (current: ${currentRows || minRows})`}
    >
      {/* Up arrow */}
      <svg
        className={`w-4 h-4 transition-colors ${
          isDragging ? "text-white" : "text-gray-600"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>

      {/* Row count indicator */}
      <div className="flex flex-col gap-0.5 items-center">
        <span
          className={`text-xs font-mono ${
            isDragging ? "text-white" : "text-gray-600"
          }`}
        >
          {currentRows || minRows}
        </span>
      </div>

      {/* Down arrow */}
      <svg
        className={`w-4 h-4 transition-colors ${
          isDragging ? "text-white" : "text-gray-600"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
};
