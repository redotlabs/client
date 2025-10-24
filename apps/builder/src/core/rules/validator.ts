import type { EditorAction } from '@/core/actions';
import type {
  Rule,
  RuleValidationResult,
  EditorRuleContext,
  RuleViolation,
} from './types';

/**
 * Rule Validator
 * 모든 룰을 검증하고 결과를 반환하는 엔진
 */
export class RuleValidator {
  private rules: Map<string, Rule> = new Map();

  /**
   * 룰 등록
   */
  registerRule(rule: Rule): void {
    this.rules.set(rule.name, rule);
  }

  /**
   * 룰 제거
   */
  unregisterRule(ruleName: string): void {
    this.rules.delete(ruleName);
  }

  /**
   * 모든 룰 검증
   */
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

  /**
   * 특정 룰만 검증
   */
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

  /**
   * 등록된 모든 룰 목록
   */
  getRules(): Rule[] {
    return Array.from(this.rules.values());
  }

  /**
   * 룰 개수
   */
  getRuleCount(): number {
    return this.rules.size;
  }
}

/**
 * 글로벌 Validator 인스턴스
 */
export const globalRuleValidator = new RuleValidator();
