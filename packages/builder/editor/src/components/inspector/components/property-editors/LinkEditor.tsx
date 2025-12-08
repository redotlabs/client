import type { PropertyEditorProps } from './types';
import type { LinkProps } from '@repo/builder/renderer';
import { useEditorContext } from '@/context';

export const LinkEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const { pages } = useEditorContext();
  const props = (block.props as LinkProps) || {};

  const updateProps = (newProps: Partial<LinkProps>) => {
    onUpdate({ props: { ...props, ...newProps } });
  };

  const targetOptions = [
    { value: '_self', label: 'Same Tab (_self)' },
    { value: '_blank', label: 'New Tab (_blank)' },
    { value: '_parent', label: 'Parent Frame (_parent)' },
    { value: '_top', label: 'Top Frame (_top)' },
  ];

  const textDecorationOptions = [
    { value: 'none', label: 'None' },
    { value: 'underline', label: 'Underline' },
    { value: 'line-through', label: 'Line Through' },
  ];

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '400', label: '400 - Normal' },
    { value: '500', label: '500 - Medium' },
    { value: '600', label: '600 - Semi Bold' },
    { value: '700', label: '700 - Bold' },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Link Properties
      </h4>

      {/* Link Text */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Link Text
        </label>
        <input
          type="text"
          value={props.children || ''}
          onChange={(e) => updateProps({ children: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Link"
        />
      </div>

      {/* Link Type Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Link Type
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateProps({ href: '#' })}
            className={`flex-1 px-3 py-1.5 text-xs rounded border ${
              !props.href?.startsWith('/')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            External URL
          </button>
          <button
            type="button"
            onClick={() => {
              const firstPage = pages[0];
              updateProps({ href: firstPage?.path || '/', target: '_self' });
            }}
            className={`flex-1 px-3 py-1.5 text-xs rounded border ${
              props.href?.startsWith('/')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            Internal Page
          </button>
        </div>
      </div>

      {/* Internal Page Selector (only if href starts with /) */}
      {props.href?.startsWith('/') && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Select Page
          </label>
          <select
            value={props.href || '/'}
            onChange={(e) =>
              updateProps({ href: e.target.value, target: '_self' })
            }
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {pages.map((page) => (
              <option key={page.id} value={page.path}>
                {page.title} ({page.path})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            이 링크는 같은 사이트의 다른 페이지로 이동합니다
          </p>
        </div>
      )}

      {/* External URL Input (only if href doesn't start with /) */}
      {!props.href?.startsWith('/') && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="text"
            value={props.href || ''}
            onChange={(e) => updateProps({ href: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
      )}

      {/* Target */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Open In
        </label>
        <select
          value={props.target || '_self'}
          onChange={(e) =>
            updateProps({
              target: e.target.value as LinkProps['target'],
            })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {targetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={props.color || '#0000EE'}
            onChange={(e) => updateProps({ color: e.target.value })}
            className="w-12 h-9 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={props.color || ''}
            onChange={(e) => updateProps({ color: e.target.value })}
            placeholder="#0000EE"
            className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

      {/* Text Decoration */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Text Decoration
        </label>
        <select
          value={props.textDecoration || 'underline'}
          onChange={(e) =>
            updateProps({
              textDecoration: e.target.value as LinkProps['textDecoration'],
            })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {textDecorationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
