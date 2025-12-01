import type { PropertyEditorProps } from './types';
import type { TextProps } from '@repo/renderer';

export const TextEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as TextProps) || {};

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '100', label: '100 - Thin' },
    { value: '200', label: '200 - Extra Light' },
    { value: '300', label: '300 - Light' },
    { value: '400', label: '400 - Normal' },
    { value: '500', label: '500 - Medium' },
    { value: '600', label: '600 - Semi Bold' },
    { value: '700', label: '700 - Bold' },
    { value: '800', label: '800 - Extra Bold' },
    { value: '900', label: '900 - Black' },
  ];

  const updateProps = (newProps: Partial<TextProps>) => {
    onUpdate({ props: { ...props, ...newProps } });
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Text Properties
      </h4>

      {/* Content */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Content
        </label>
        <input
          type="text"
          value={props.children || ''}
          onChange={(e) => updateProps({ children: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Font Size (px)
        </label>
        <input
          type="number"
          value={props.fontSize || ''}
          onChange={(e) =>
            updateProps({
              fontSize: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="16"
          min="1"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={props.color || '#000000'}
            onChange={(e) => updateProps({ color: e.target.value })}
            className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={props.color || ''}
            onChange={(e) => updateProps({ color: e.target.value })}
            placeholder="#000000"
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Font Weight
        </label>
        <select
          value={props.fontWeight || 'normal'}
          onChange={(e) => updateProps({ fontWeight: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fontWeightOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
            onChange={(e) => updateProps({ backgroundColor: e.target.value })}
            className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={props.backgroundColor || ''}
            onChange={(e) => updateProps({ backgroundColor: e.target.value })}
            placeholder="#ffffff"
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
