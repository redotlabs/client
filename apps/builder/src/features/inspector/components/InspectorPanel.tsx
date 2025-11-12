import { useState } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { useEditorContext } from "@/app/context/EditorContext";
import {
  getSelectionType,
  getFirstSelectedBlock,
  getSelectedSection,
} from "@/core/state/selectors";

interface InspectorPanelProps {
  onClose?: () => void;
}

export const InspectorPanel = ({ onClose }: InspectorPanelProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { state } = useEditorContext();

  const renderContent = () => {
    const selectionType = getSelectionType(state);
    const selectedBlock = getFirstSelectedBlock(state);
    const selectedSection = getSelectedSection(state);

    if (selectionType === "block" && selectedBlock) {
      const hasProps: boolean =
        !!selectedBlock.props &&
        typeof selectedBlock.props === "object" &&
        Object.keys(selectedBlock.props as Record<string, unknown>).length > 0;

      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-xs text-gray-500 uppercase mb-2">
              Block Properties
            </h4>
            <div className="space-y-2">
              <PropertyRow label="Type" value={selectedBlock.component} />
              <PropertyRow label="ID" value={selectedBlock.id} />
              <PropertyRow
                label="Position"
                value={`(${selectedBlock.position.x}, ${selectedBlock.position.y})`}
              />
              <PropertyRow
                label="Size"
                value={`${selectedBlock.size.width} × ${selectedBlock.size.height}`}
              />
              <PropertyRow
                label="Z-Index"
                value={String(selectedBlock.position.zIndex)}
              />
            </div>
          </div>

          {hasProps && (
            <div>
              <h4 className="font-semibold text-xs text-gray-500 uppercase mb-2">
                Component Props
              </h4>
              <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                <pre>{JSON.stringify(selectedBlock.props, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 섹션이 선택된 경우
    if (selectionType === "section" && selectedSection) {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-xs text-gray-500 uppercase mb-2">
              Section Properties
            </h4>
            <div className="space-y-2">
              <PropertyRow label="Name" value={selectedSection.name} />
              <PropertyRow label="ID" value={selectedSection.id} />
              <PropertyRow
                label="Rows"
                value={String(selectedSection.rows || "auto")}
              />
              <PropertyRow
                label="Blocks"
                value={String(selectedSection.blocks.length)}
              />
            </div>
          </div>
        </div>
      );
    }

    // 선택 없음
    return <EmptyState />;
  };

  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg border border-gray-200 z-50"
      style={{
        right: "16px",
        top: "16px",
        width: "360px",
        maxHeight: isMinimized ? "48px" : "calc(100vh - 32px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-sm text-gray-900">Inspector</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-gray-600" />
            ) : (
              <Minimize2 className="w-4 h-4 text-gray-600" />
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {renderContent()}
        </div>
      )}
    </div>
  );
};

const EmptyState = () => (
  <div className="text-sm text-gray-500 text-center py-8">
    Select an element to inspect
  </div>
);

interface PropertyRowProps {
  label: string;
  value: string;
}

const PropertyRow = ({ label, value }: PropertyRowProps) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-900 font-mono text-xs">{value}</span>
  </div>
);
