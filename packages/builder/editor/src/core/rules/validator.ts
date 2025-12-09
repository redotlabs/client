import type { EditorAction } from "@/core/actions";
import type {
  Rule,
  RuleValidationResult,
  EditorRuleContext,
  RuleViolation,
} from "./types";
import { blockBoundsRule } from "./block-bounds-rule";
import { blockResizeBoundsRule } from "./block-resize-bounds-rule";

/**
 * Rule Validator
 * 모든 룰을 검증하고 결과를 반환하는 엔진
 */
export class RuleValidator {
  private rules: Map<string, Rule> = new Map();

  registerRule(rule: Rule): void {
    this.rules.set(rule.name, rule);
  }

  unregisterRule(ruleName: string): void {
    this.rules.delete(ruleName);
  }

  validate(
    action: EditorAction,
    context: EditorRuleContext
  ): RuleValidationResult {
    const violations: RuleViolation[] = [];

    for (const rule of this.rules.values()) {
      const result = rule.validate(action, context);

      if (!result.valid) {
        violations.push(...result.violations);
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }

  validateRule(
    ruleName: string,
    action: EditorAction,
    context: EditorRuleContext
  ): RuleValidationResult {
    const rule = this.rules.get(ruleName);

    if (!rule) {
      return {
        valid: true,
        violations: [],
      };
    }

    return rule.validate(action, context);
  }

  getRules(): Rule[] {
    return Array.from(this.rules.values());
  }

  getRuleCount(): number {
    return this.rules.size;
  }
}

export const globalRuleValidator = new RuleValidator();

globalRuleValidator.registerRule(blockBoundsRule);
globalRuleValidator.registerRule(blockResizeBoundsRule);
