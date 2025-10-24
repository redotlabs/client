import type { EditorAction } from './actions';
import type { EditorState } from './state';
import { createInitialEditorState } from './state';
import { globalRuleValidator, baseRules } from './rules';
import type { RuleValidationResult, EditorRuleContext } from './rules';
import type { BuilderBlock, GridConfig } from '@/shared/types';

/**
 * Editor Controller
 * 에디터의 전체 동작을 제어하는 중앙 컨트롤러
 */
export class EditorController {
  private state: EditorState;
  private listeners: ((state: EditorState) => void)[] = [];

  constructor(blocks: BuilderBlock[], gridConfig: GridConfig) {
    this.state = createInitialEditorState(blocks, gridConfig);

    // 기본 룰 등록
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

  /**
   * Rule 검증
   */
  private validateAction(action: EditorAction): RuleValidationResult {
    const context: EditorRuleContext = {
      blocks: Array.from(this.state.blocks.values()),
      selectedBlockIds: Array.from(this.state.selection.selectedBlockIds),
      gridConfig: this.state.gridConfig,
      editorMode: this.state.mode,
    };

    return globalRuleValidator.validate(action, context);
  }

  /**
   * Action 적용 (상태 업데이트)
   */
  private applyAction(action: EditorAction, state: EditorState): EditorState {
    switch (action.type) {
      case 'block.select': {
        const { blockId, multiSelect } = action.payload;
        const selectedBlockIds = multiSelect
          ? new Set(state.selection.selectedBlockIds).add(blockId)
          : new Set([blockId]);

        return {
          ...state,
          selection: {
            selectedBlockIds,
            lastSelectedId: blockId,
          },
        };
      }

      case 'block.deselect': {
        const { blockId } = action.payload;
        if (!blockId) {
          return {
            ...state,
            selection: {
              selectedBlockIds: new Set(),
              lastSelectedId: null,
            },
          };
        }

        const selectedBlockIds = new Set(state.selection.selectedBlockIds);
        selectedBlockIds.delete(blockId);

        return {
          ...state,
          selection: {
            selectedBlockIds,
            lastSelectedId:
              state.selection.lastSelectedId === blockId
                ? null
                : state.selection.lastSelectedId,
          },
        };
      }

      case 'block.move': {
        const { blockId, position } = action.payload;
        const block = state.blocks.get(blockId);
        if (!block) return state;

        const newBlocks = new Map(state.blocks);
        newBlocks.set(blockId, { ...block, position });

        return {
          ...state,
          blocks: newBlocks,
        };
      }

      case 'block.resize': {
        const { blockId, size } = action.payload;
        const block = state.blocks.get(blockId);
        if (!block) return state;

        const newBlocks = new Map(state.blocks);
        newBlocks.set(blockId, { ...block, size });

        return {
          ...state,
          blocks: newBlocks,
        };
      }

      case 'block.create': {
        const { block } = action.payload;
        const newBlocks = new Map(state.blocks);
        newBlocks.set(block.id, block);

        return {
          ...state,
          blocks: newBlocks,
        };
      }

      case 'block.delete': {
        const { blockId } = action.payload;
        const newBlocks = new Map(state.blocks);
        newBlocks.delete(blockId);

        // 선택도 제거
        const selectedBlockIds = new Set(state.selection.selectedBlockIds);
        selectedBlockIds.delete(blockId);

        return {
          ...state,
          blocks: newBlocks,
          selection: {
            selectedBlockIds,
            lastSelectedId:
              state.selection.lastSelectedId === blockId
                ? null
                : state.selection.lastSelectedId,
          },
        };
      }

      case 'block.update': {
        const { blockId, updates } = action.payload;
        const block = state.blocks.get(blockId);
        if (!block) return state;

        const newBlocks = new Map(state.blocks);
        newBlocks.set(blockId, { ...block, ...updates });

        return {
          ...state,
          blocks: newBlocks,
        };
      }

      case 'editor.mode.change': {
        const { mode } = action.payload;
        return {
          ...state,
          mode,
        };
      }

      default:
        return state;
    }
  }

  /**
   * 상태 조회
   */
  getState(): Readonly<EditorState> {
    return this.state;
  }

  /**
   * 상태 변경 구독
   */
  subscribe(listener: (state: EditorState) => void): () => void {
    this.listeners.push(listener);

    // 구독 해제 함수 반환
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * 리스너에게 상태 변경 알림
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }
}
