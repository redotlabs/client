import {
  LayoutGrid,
  Type,
  Shapes,
  MousePointer,
  Plus,
  Image,
  Link,
  Box,
} from 'lucide-react';
import { useEditorContext } from '@/context';
import { createSection } from '@/core/actions';
import { BLOCK_REGISTRY } from '@/core/blocks';
import { useBlockActions } from '@/components/canvas/hooks/useBlockActions';
import { cn } from '@redotlabs/utils';

interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  blockTemplateId?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'section', label: 'Section', icon: <LayoutGrid className="w-5 h-5" /> },
  {
    id: 'text',
    label: 'Text',
    icon: <Type className="w-5 h-5" />,
    blockTemplateId: 'text',
  },
  {
    id: 'button',
    label: 'Button',
    icon: <MousePointer className="w-5 h-5" />,
    blockTemplateId: 'button',
  },
  {
    id: 'input',
    label: 'Input',
    icon: <Type className="w-5 h-5" />,
    blockTemplateId: 'input',
  },
  {
    id: 'badge',
    label: 'Badge',
    icon: <Shapes className="w-5 h-5" />,
    blockTemplateId: 'badge',
  },
  {
    id: 'image',
    label: 'Image',
    icon: <Image className="w-5 h-5" />,
    blockTemplateId: 'image',
  },
  {
    id: 'link',
    label: 'Link',
    icon: <Link className="w-5 h-5" />,
    blockTemplateId: 'link',
  },
  {
    id: 'frame',
    label: 'Frame',
    icon: <Box className="w-5 h-5" />,
    blockTemplateId: 'frame',
  },
];

export const LeftPanel = ({ className }: { className?: string }) => {
  const { dispatch } = useEditorContext();
  const { handleAddBlock, handleDragStart } = useBlockActions();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'section') {
      dispatch(createSection());
    }
  };

  const handleCategoryDoubleClick = (category: CategoryItem) => {
    if (category.blockTemplateId) {
      const template = BLOCK_REGISTRY.find(
        (t) => t.id === category.blockTemplateId
      );
      if (template) {
        handleAddBlock(template);
      }
    }
  };

  const handleCategoryDragStart = (category: CategoryItem) => {
    if (category.blockTemplateId) {
      const template = BLOCK_REGISTRY.find(
        (t) => t.id === category.blockTemplateId
      );
      if (template) {
        handleDragStart(template);
      }
    }
  };

  return (
    <div
      className={cn(
        'fixed left-4 top-[72px] max-h-[calc(100vh-88px)] z-40',
        className
      )}
    >
      <div className="w-16 flex flex-col items-center py-2 overflow-y-auto max-h-[calc(100vh-88px)]">
        {CATEGORIES.map((category) => {
          const isSection = category.id === 'section';
          const isDraggable = !!category.blockTemplateId;

          return (
            <div
              key={category.id}
              className={`
                w-14 h-14 rounded-lg mb-1.5 flex flex-col items-center justify-center gap-0.5
                transition-colors duration-200 relative
                bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300
                ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
              `}
              onClick={() => handleCategoryClick(category.id)}
              onDoubleClick={() => handleCategoryDoubleClick(category)}
              draggable={isDraggable}
              onDragStart={() => handleCategoryDragStart(category)}
            >
              {isSection && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <Plus className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              {category.icon}
              <span className="text-[9px] font-medium">{category.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
