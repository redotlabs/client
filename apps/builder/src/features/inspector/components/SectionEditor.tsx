import type { Section } from "@/shared/types";

interface SectionEditorProps {
  section: Section;
  onUpdate: (updates: Partial<Section>) => void;
}

export const SectionEditor = ({ section, onUpdate }: SectionEditorProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-xs text-gray-500 uppercase">
        Section Properties
      </h4>

      {/* Section Name */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={section.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Section Rows */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Rows
        </label>
        <input
          type="number"
          value={section.rows || ""}
          onChange={(e) => onUpdate({ rows: parseInt(e.target.value) || undefined })}
          placeholder="Auto"
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Leave empty for auto height
        </p>
      </div>

      {/* Read-only Info */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Blocks</span>
          <span className="font-mono text-gray-900">{section.blocks.length}</span>
        </div>
      </div>
    </div>
  );
};
