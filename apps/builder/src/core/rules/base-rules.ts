import type { Rule, RuleValidationResult } from './types';

/**
 * 블록이 그리드 영역 밖으로 나갈 수 없음
 */
export const blockBoundsRule: Rule = {
  name: 'block.bounds',
  description: 'Blocks must stay within grid boundaries',
  validate: (action, context) => {
    const violations: RuleValidationResult['violations'] = [];

    if (action.type === 'block.move') {
      const { position } = action.payload;
      const { gridConfig } = context;

      // TODO: 실제 블록 크기를 고려한 경계 검사
      if (
        position.x < 1 ||
        position.y < 1 ||
        position.x > gridConfig.columns ||
        position.y > gridConfig.rows
      ) {
        violations.push({
          rule: 'block.bounds',
          message: 'Block cannot be moved outside grid boundaries',
          blockId: action.payload.blockId,
          severity: 'error',
        });
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  },
};

/**
 * 블록 겹침 검사 (기본 구조만)
 */
export const blockOverlapRule: Rule = {
  name: 'block.overlap',
  description: 'Blocks cannot overlap with each other',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate: (action, context) => {
    // TODO: 실제 겹침 검사 로직 구현 (추후 작업)
    // 현재는 통과
    return { valid: true, violations: [] };
  },
};

/**
 * 기본 룰들을 배열로 export
 */
export const baseRules: Rule[] = [blockBoundsRule, blockOverlapRule];
