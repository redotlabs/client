import type { EditorAction } from './actions';
import type { EditorState } from './state';
import { createInitialEditorState } from './state';
import { globalRuleValidator, baseRules } from './rules';
import type { RuleValidationResult, EditorRuleContext } from './rules';
import type { BuilderBlock, GridConfig } from '@/shared/types';
import * as stateUpdaters from './state/updaters';

/**
 * Editor Controller
 * 에디터의 전체 동작을 제어하는 중앙 컨트롤러
 */
export class EditorController {
  private state: EditorState;
  private listeners: ((state: EditorState) => void)[] = [];

  constructor(blocks: BuilderBlock[], gridConfig: GridConfig) {
    this.state = createInitialEditorState(blocks, gridConfig);

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
    const context: EditorRuleContext = {
      blocks: Array.from(this.state.blocks.values()),
      selectedBlockIds: Array.from(this.state.selection.selectedBlockIds),
      gridConfig: this.state.gridConfig,
    };

    return globalRuleValidator.validate(action, context);
  }

  private applyAction(action: EditorAction, state: EditorState): EditorState {
    switch (action.type) {
      case 'block.select':
        return stateUpdaters.selectBlockState(
          state,
          action.payload.blockId,
          action.payload.multiSelect ?? false
        );

      case 'block.deselect':
        return stateUpdaters.deselectBlockState(state, action.payload.blockId);

      case 'block.move':
        return stateUpdaters.moveBlockState(
          state,
          action.payload.blockId,
          action.payload.position
        );

      case 'block.resize':
        return stateUpdaters.resizeBlockState(
          state,
          action.payload.blockId,
          action.payload.size
        );

      case 'block.create':
        return stateUpdaters.createBlockState(state, action.payload.block);

      case 'block.delete':
        return stateUpdaters.deleteBlockState(state, action.payload.blockId);

      case 'block.update':
        return stateUpdaters.updateBlockState(
          state,
          action.payload.blockId,
          action.payload.updates
        );

      default:
        return state;
    }
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
