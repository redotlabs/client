import type { EditorAction } from '@/core/actions';
import type { BuilderBlock, GridConfig } from '@/shared/types';

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

/**
 * Rule Validation Result
 */
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
  editorMode: 'edit' | 'preview' | 'readonly';
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

/**
 * Rule Type Categories
 */
export type RuleCategory =
  | 'editor' // 에디터 전반적인 룰
  | 'block.movement' // 블록 이동 관련
  | 'block.resize' // 블록 크기 조절 관련
  | 'block.selection' // 블록 선택 관련
  | 'block.overlap' // 블록 겹침 관련
  | 'block.bounds'; // 블록 경계 관련
