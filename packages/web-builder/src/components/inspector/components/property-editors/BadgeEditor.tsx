import type { PropertyEditorProps } from "./types";
import type { BadgeProps } from "@repo/renderer";
import { badgeVariantsOptions } from "@repo/renderer";

export const BadgeEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as BadgeProps) || {};

  // @redotlabs/ui에서 자동으로 옵션 추출
  const colorOptions = Object.keys(badgeVariantsOptions.variants.color).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  const sizeOptions = Object.keys(badgeVariantsOptions.variants.size).map((key) => ({
    value: key,
    label: key.toUpperCase(),
  }));

  const updateProps = (newProps: Partial<BadgeProps>) => {
    onUpdate({ props: { ...props, ...newProps } });
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Badge Properties
      </h4>

      {/* Children (Content) */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Content
        </label>
        <input
          type="text"
          value={props.children?.toString() || ""}
          onChange={(e) => updateProps({ children: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Color
        </label>
        <select
          value={props.color || "primary"}
          onChange={(e) => updateProps({ color: e.target.value as BadgeProps["color"] })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {colorOptions.map((option) => (
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
          value={props.size || "md"}
          onChange={(e) => updateProps({ size: e.target.value as BadgeProps["size"] })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
