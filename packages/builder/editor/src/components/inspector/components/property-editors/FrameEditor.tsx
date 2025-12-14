import type { PropertyEditorProps } from './types';
import type { FrameProps, AutoLayoutConfig } from '@repo/builder/renderer';

export const FrameEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as FrameProps) || {
    layout: {
      direction: 'vertical',
      gap: 8,
      padding: { top: 16, right: 16, bottom: 16, left: 16 },
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  };

  const updateLayout = (layoutUpdates: Partial<AutoLayoutConfig>) => {
    onUpdate({
      props: {
        ...props,
        layout: {
          ...props.layout,
          ...layoutUpdates,
        },
      },
    });
  };

  const updatePadding = (side: keyof AutoLayoutConfig['padding'], value: number) => {
    onUpdate({
      props: {
        ...props,
        layout: {
          ...props.layout,
          padding: {
            ...props.layout.padding,
            [side]: value,
          },
        },
      },
    });
  };

  const updateBackgroundColor = (backgroundColor?: string) => {
    onUpdate({
      props: {
        ...props,
        backgroundColor,
      },
    });
  };

  const updateBorderRadius = (borderRadius?: number) => {
    onUpdate({
      props: {
        ...props,
        borderRadius,
      },
    });
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Frame Properties
      </h4>

      {/* Direction */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Direction
        </label>
        <select
          value={props.layout.direction}
          onChange={(e) =>
            updateLayout({ direction: e.target.value as AutoLayoutConfig['direction'] })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="wrap">Wrap</option>
        </select>
      </div>

      {/* Gap */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Gap (px)
        </label>
        <input
          type="number"
          value={props.layout.gap}
          onChange={(e) =>
            updateLayout({ gap: e.target.value ? parseInt(e.target.value) : 0 })
          }
          min="0"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Padding */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Padding (px)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Top</label>
            <input
              type="number"
              value={props.layout.padding.top}
              onChange={(e) =>
                updatePadding('top', e.target.value ? parseInt(e.target.value) : 0)
              }
              min="0"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Right</label>
            <input
              type="number"
              value={props.layout.padding.right}
              onChange={(e) =>
                updatePadding('right', e.target.value ? parseInt(e.target.value) : 0)
              }
              min="0"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Bottom</label>
            <input
              type="number"
              value={props.layout.padding.bottom}
              onChange={(e) =>
                updatePadding('bottom', e.target.value ? parseInt(e.target.value) : 0)
              }
              min="0"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Left</label>
            <input
              type="number"
              value={props.layout.padding.left}
              onChange={(e) =>
                updatePadding('left', e.target.value ? parseInt(e.target.value) : 0)
              }
              min="0"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Align Items */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Align Items
        </label>
        <select
          value={props.layout.alignItems}
          onChange={(e) =>
            updateLayout({ alignItems: e.target.value as AutoLayoutConfig['alignItems'] })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>

      {/* Justify Content */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Justify Content
        </label>
        <select
          value={props.layout.justifyContent}
          onChange={(e) =>
            updateLayout({
              justifyContent: e.target.value as AutoLayoutConfig['justifyContent'],
            })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
        </select>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={props.backgroundColor || '#ffffff'}
            onChange={(e) => updateBackgroundColor(e.target.value)}
            className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={props.backgroundColor || ''}
            onChange={(e) => updateBackgroundColor(e.target.value)}
            placeholder="#ffffff"
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Border Radius (px)
        </label>
        <input
          type="number"
          value={props.borderRadius || 0}
          onChange={(e) =>
            updateBorderRadius(e.target.value ? parseInt(e.target.value) : undefined)
          }
          min="0"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
