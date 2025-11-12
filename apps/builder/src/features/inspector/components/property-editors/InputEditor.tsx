import type { PropertyEditorProps } from "./types";
import type { BuilderBlock } from "@/shared/types";
import type { InputProps } from "@/shared/types/blocks/attributes";
import { inputVariantsOptions } from "@/shared/types/blocks/attributes";

export const InputEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as InputProps) || {};

  // @redotlabs/ui에서 자동으로 size 옵션 추출
  const sizeOptions = Object.keys(inputVariantsOptions.variants.size).map((key) => ({
    value: key,
    label: key.toUpperCase(),
  }));

  // input type은 HTML 표준이므로 여기서는 수동 정의
  const typeOptions = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "number", label: "Number" },
    { value: "tel", label: "Tel" },
    { value: "url", label: "URL" },
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Input Properties
      </h4>

      {/* Placeholder */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Placeholder
        </label>
        <input
          type="text"
          value={props.placeholder || ""}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, placeholder: e.target.value },
            } as Partial<BuilderBlock>)
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Value */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Value
        </label>
        <input
          type="text"
          value={props.value || ""}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, value: e.target.value },
            } as Partial<BuilderBlock>)
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={props.type || "text"}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, type: e.target.value as typeof props.type },
            } as Partial<BuilderBlock>)
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {typeOptions.map((option) => (
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
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, size: e.target.value as typeof props.size },
            } as Partial<BuilderBlock>)
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
          id="input-disabled"
          checked={props.disabled || false}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, disabled: e.target.checked },
            } as Partial<BuilderBlock>)
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="input-disabled"
          className="ml-2 text-xs font-medium text-gray-700"
        >
          Disabled
        </label>
      </div>

      {/* Error */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="input-error"
          checked={props.error || false}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, error: e.target.checked },
            } as Partial<BuilderBlock>)
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="input-error"
          className="ml-2 text-xs font-medium text-gray-700"
        >
          Error State
        </label>
      </div>
    </div>
  );
};
