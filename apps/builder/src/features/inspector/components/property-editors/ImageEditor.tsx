import { useRef, type ChangeEvent } from "react";
import type { PropertyEditorProps } from "./types";
import type { ImageProps } from "@/shared/types/blocks/attributes";

export const ImageEditor = ({ block, onUpdate }: PropertyEditorProps) => {
  const props = (block.props as ImageProps) || {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const objectFitOptions = [
    { value: "contain", label: "Contain" },
    { value: "cover", label: "Cover" },
    { value: "fill", label: "Fill" },
    { value: "none", label: "None" },
    { value: "scale-down", label: "Scale Down" },
  ];

  const updateProps = (newProps: Partial<ImageProps>) => {
    onUpdate({ props: { ...props, ...newProps } });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateProps({ src: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    updateProps({ src: "" });
  };

  const hasImage = props.src && props.src.length > 0;

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Image Properties
      </h4>

      {/* Image Preview & Upload */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {hasImage ? (
          <div className="space-y-2">
            <div className="relative w-full h-24 bg-gray-100 rounded border border-gray-200 overflow-hidden">
              <img
                src={props.src}
                alt={props.alt || ""}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex-1 px-2 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
          >
            <span className="text-sm font-medium text-gray-600">
              Click to upload
            </span>
            <span className="text-xs text-gray-400">PNG, JPG, GIF</span>
          </button>
        )}
      </div>

      {/* Source URL (alternative to upload) */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          URL (optional)
        </label>
        <input
          type="text"
          value={props.src || ""}
          onChange={(e) => updateProps({ src: e.target.value })}
          placeholder="https://example.com/image.png"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Alt Text */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Alt Text
        </label>
        <input
          type="text"
          value={props.alt || ""}
          onChange={(e) => updateProps({ alt: e.target.value })}
          placeholder="Image description"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Object Fit */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Object Fit
        </label>
        <select
          value={props.objectFit || "cover"}
          onChange={(e) =>
            updateProps({
              objectFit: e.target.value as ImageProps["objectFit"],
            })
          }
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {objectFitOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
