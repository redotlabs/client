import type { PropertyEditorProps } from './types';
import type { ButtonProps } from '@repo/renderer';
import { buttonVariantsOptions } from '@repo/renderer';

export const ButtonEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as ButtonProps) || {};

  // @redotlabs/ui에서 자동으로 옵션 추출
  const variantOptions = Object.keys(
    buttonVariantsOptions.variants.variant
  ).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  const sizeOptions = Object.keys(buttonVariantsOptions.variants.size).map(
    (key) => ({
      value: key,
      label: key.toUpperCase(),
    })
  );

  const updateProps = (newProps: Partial<ButtonProps>) => {
    onUpdate({ props: { ...props, ...newProps } });
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Button Properties
      </h4>

      {/* Children (Content) */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Content
        </label>
        <input
          type="text"
          value={props.children?.toString() || ''}
          onChange={(e) => updateProps({ children: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Variant */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Variant
        </label>
        <select
          value={props.variant || 'default'}
          onChange={(e) =>
            updateProps({ variant: e.target.value as ButtonProps['variant'] })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {variantOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Size
        </label>
        <select
          value={props.size || 'md'}
          onChange={(e) =>
            updateProps({ size: e.target.value as ButtonProps['size'] })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Disabled */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="button-disabled"
          checked={props.disabled || false}
          onChange={(e) => updateProps({ disabled: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="button-disabled"
          className="ml-2 text-xs font-medium text-gray-700"
        >
          Disabled
        </label>
      </div>
    </div>
  );
};
