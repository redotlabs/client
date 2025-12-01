import type { Rule, RuleValidationResult, EditorRuleContext } from "./types";
import type { EditorAction } from "@/core/actions";
import { getSectionRows } from "@/shared/utils/sectionHeight";

/**
 * Block Resize Bounds Rule
 * 리사이즈된 블록이 그리드 범위를 벗어나지 않도록 검증
 */
export const blockResizeBoundsRule: Rule = {
  name: "block-resize-bounds",
  description: "리사이즈된 블록이 그리드 경계 내에 있어야 합니다",

  validate: (
    action: EditorAction,
    context: EditorRuleContext
  ): RuleValidationResult => {
    if (action.type !== "block.resize") {
      return { valid: true, violations: [] };
    }

    const { blockId, size } = action.payload;
    const { blocks, gridConfig, sections } = context;

    const block = blocks.find((b) => b.id === blockId);
    if (!block) {
      return { valid: true, violations: [] };
    }

    const section = sections.find((s) =>
      s.blocks.some((b) => b.id === blockId)
    );
    if (!section) {
      return { valid: true, violations: [] };
    }

    const violations = [];
    const sectionRows = getSectionRows(section);

    const isOutOfBounds =
      block.position.x + size.width > gridConfig.columns ||
      block.position.y + size.height > sectionRows;

    if (isOutOfBounds) {
      violations.push({
        rule: "block-resize-bounds",
        message: "블록을 경계 밖으로 리사이즈할 수 없습니다",
        blockId,
        severity: "error" as const,
      });
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  },
};
