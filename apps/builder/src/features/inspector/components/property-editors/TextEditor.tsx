import type { PropertyEditorProps } from "./types";
import type { BuilderBlock } from "@/shared/types";
import type { TextProps } from "@/shared/types/blocks/attributes";

export const TextEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as TextProps) || {};

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
          value={props.children || ""}
          onChange={(e) =>
            onUpdate({
              ...block,
              props: { ...props, children: e.target.value },
            } as Partial<BuilderBlock>)
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TODO: 추가 속성들 (color, fontSize, fontWeight 등) */}
    </div>
  );
};
