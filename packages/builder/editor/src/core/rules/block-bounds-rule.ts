import type { Rule, RuleValidationResult, EditorRuleContext } from "./types";
import type { EditorAction } from "@/core/actions";
import { getSectionRows } from "@/shared/utils/sectionHeight";

/**
 * Block Bounds Rule
 * 블록이 그리드 범위를 벗어나지 않도록 검증
 */
export const blockBoundsRule: Rule = {
  name: "block-bounds",
  description: "블록이 그리드 경계 내에 있어야 합니다",

  validate: (
    action: EditorAction,
    context: EditorRuleContext
  ): RuleValidationResult => {
    if (action.type !== "block.move") {
      return { valid: true, violations: [] };
    }

    const { blockId, position } = action.payload;
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
      position.x < 0 ||
      position.x + block.size.width > gridConfig.columns ||
      position.y < 0 ||
      position.y + block.size.height > sectionRows;

    if (isOutOfBounds) {
      violations.push({
        rule: "block-bounds",
        message: "블록을 경계 밖으로 이동할 수 없습니다",
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
