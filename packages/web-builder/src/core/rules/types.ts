import type { EditorAction } from '@/core/actions';
import type { BuilderBlock, GridConfig, Section } from '@repo/renderer';

/**
 * Rule Violation
 * 룰 위반 시 반환되는 정보
 */
export interface RuleViolation {
  rule: string;
  message: string;
  blockId?: string;
  severity: 'error' | 'warning';
}

export interface RuleValidationResult {
  valid: boolean;
  violations: RuleViolation[];
}

/**
 * Editor State (for rule validation)
 * 룰 검증에 필요한 에디터 상태 정보
 */
export interface EditorRuleContext {
  blocks: BuilderBlock[];
  selectedBlockIds: string[];
  gridConfig: GridConfig;
  sections: Section[];
}

/**
 * Rule
 * 개별 룰의 인터페이스
 */
export interface Rule {
  name: string;
  description: string;
  validate: (
    action: EditorAction,
    context: EditorRuleContext
  ) => RuleValidationResult;
}

export type RuleCategory =
  | 'editor'
  | 'block.movement'
  | 'block.resize'
  | 'block.selection'
  | 'block.overlap'
  | 'block.bounds';
