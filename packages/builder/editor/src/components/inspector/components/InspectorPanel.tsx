import { useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useEditorContext } from '@/context';
import {
  getSelectionType,
  getFirstSelectedBlock,
  getSelectedSection,
  getParentSection,
} from '@/core/state/selectors';
import { getPropertyEditor } from './property-editors';
import { SectionEditor } from './SectionEditor';
import { updateBlock, updateSection } from '@/core/actions';
import { cn } from '@redotlabs/utils';

interface InspectorPanelProps {
  onClose?: () => void;
  className?: string;
}

export const InspectorPanel = ({ onClose, className }: InspectorPanelProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { state, dispatch } = useEditorContext();

  const renderContent = () => {
    const selectionType = getSelectionType(state);
    const selectedBlock = getFirstSelectedBlock(state);
    const selectedSection = getSelectedSection(state);

    if (selectionType === 'block' && selectedBlock) {
      const parentSection = getParentSection(selectedBlock.id)(state);

      if (!parentSection) return <EmptyState />;

      const PropertyEditor = getPropertyEditor(selectedBlock.component);

      const handleBlockUpdate = (updates: Partial<typeof selectedBlock>) => {
        dispatch(
          updateBlock(parentSection.id, selectedBlock.id, {
            props: updates.props,
          })
        );
      };

      return (
        <div className="space-y-4">
          {/* Basic Info */}
          <div>
            <h4 className="font-semibold text-xs text-gray-500 uppercase mb-2">
              Block Info
            </h4>
            <div className="space-y-2">
              <PropertyRow label="Type" value={selectedBlock.component} />
              <PropertyRow label="ID" value={selectedBlock.id} />
            </div>
          </div>

          {/* Property Editor */}
          {PropertyEditor && (
            <div className="pt-3 border-t border-gray-200">
              <PropertyEditor
                block={selectedBlock}
                onUpdate={handleBlockUpdate}
              />
            </div>
          )}
        </div>
      );
    }

    if (selectionType === 'section' && selectedSection) {
      const handleSectionUpdate = (
        updates: Partial<typeof selectedSection>
      ) => {
        dispatch(updateSection(selectedSection.id, updates));
      };

      return (
        <SectionEditor
          section={selectedSection}
          onUpdate={handleSectionUpdate}
        />
      );
    }

    return <EmptyState />;
  };

  return (
    <div
      className={cn(
        'fixed right-4 top-[72px] w-[280px] bg-white shadow-lg rounded-lg border border-gray-200 z-50',
        isMinimized ? 'max-h-12' : 'max-h-[calc(100vh-88px)]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-sm text-gray-900">Inspector</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
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
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-156px)]">
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
