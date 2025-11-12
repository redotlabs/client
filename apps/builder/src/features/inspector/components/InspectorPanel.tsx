import { useState } from "react";
import { X, Minimize2, Maximize2 } from "lucide-react";

interface InspectorPanelProps {
  onClose?: () => void;
}

export const InspectorPanel = ({ onClose }: InspectorPanelProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

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
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
          <div className="text-sm text-gray-500 text-center py-8">
            Select an element to inspect
          </div>
        </div>
      )}
    </div>
  );
};
