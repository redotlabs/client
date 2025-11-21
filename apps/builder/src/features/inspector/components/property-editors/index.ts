import type { ComponentType } from "@/shared/types/blocks/base";
import type { PropertyEditorComponent } from "./types";
import { TextEditor } from "./TextEditor";
import { BadgeEditor } from "./BadgeEditor";
import { ButtonEditor } from "./ButtonEditor";
import { InputEditor } from "./InputEditor";
import { ImageEditor } from "./ImageEditor";

/**
 * Property Editor Registry
 * 각 컴포넌트 타입에 대응하는 Property Editor 매핑
 */
const PROPERTY_EDITORS: Partial<
  Record<ComponentType, PropertyEditorComponent>
> = {
  text: TextEditor,
  badge: BadgeEditor,
  button: ButtonEditor,
  input: InputEditor,
  image: ImageEditor,
};

/**
 * 컴포넌트 타입에 해당하는 Property Editor를 반환
 */
export const getPropertyEditor = (
  type: ComponentType
): PropertyEditorComponent | null => {
  return PROPERTY_EDITORS[type] || null;
};

export * from "./types";
export { TextEditor, BadgeEditor, ButtonEditor, InputEditor, ImageEditor };
