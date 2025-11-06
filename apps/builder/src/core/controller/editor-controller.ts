import { createInitialEditorState, type EditorState } from '@/core/state';
import {
  type RuleValidationResult,
  type EditorRuleContext,
  baseRules,
  globalRuleValidator,
} from '@/core/rules';
import type { Section, GridConfig } from '@/shared/types';
import type { EditorAction } from '@/core/actions';
import { actionHandlers } from './action-handlers';

/**
 * Editor Controller
 * 에디터의 전체 동작을 제어하는 중앙 컨트롤러
 */
export class EditorController {
  private state: EditorState;
  private listeners: ((state: EditorState) => void)[] = [];

  constructor(gridConfig: GridConfig, sections: Section[]) {
    this.state = createInitialEditorState(gridConfig, sections);

    baseRules.forEach((rule) => {
      globalRuleValidator.registerRule(rule);
    });
  }

  /**
   * Action Dispatch
   * Action을 받아 Rule 검증 후 상태 업데이트
   */
  dispatch = (action: EditorAction): void => {
    // 1. Rule 검증
    const validationResult = this.validateAction(action);

    if (!validationResult.valid) {
      console.warn('Action validation failed:', validationResult.violations);
      // TODO: 에러 처리 (UI 피드백 등)
      return;
    }

    // 2. 상태 업데이트
    this.state = this.applyAction(action, this.state);

    // 3. 리스너에게 상태 변경 알림
    this.notifyListeners();
  };

  private validateAction(action: EditorAction): RuleValidationResult {
    // 현재 활성 섹션의 blocks를 가져옴
    const activeSection = this.state.selection.activeSectionId
      ? this.state.sections.get(this.state.selection.activeSectionId)
      : Array.from(this.state.sections.values())[0];

    const context: EditorRuleContext = {
      blocks: activeSection?.blocks || [],
      selectedBlockIds: Array.from(this.state.selection.selectedBlockIds),
      gridConfig: this.state.gridConfig,
    };

    return globalRuleValidator.validate(action, context);
  }

  private applyAction(action: EditorAction, state: EditorState): EditorState {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
  }

  getState(): Readonly<EditorState> {
    return this.state;
  }

  subscribe(listener: (state: EditorState) => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }
}
