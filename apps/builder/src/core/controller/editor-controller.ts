import { createInitialEditorState, type EditorState } from "@/core/state";
import {
  type RuleValidationResult,
  type EditorRuleContext,
  globalRuleValidator,
} from "@/core/rules";
import type { Site, GridConfig } from "@/shared/types";
import type { EditorAction } from "@/core/actions";
import { actionHandlers } from "./action-handlers";

/**
 * Editor Controller
 * 에디터의 전체 동작을 제어하는 중앙 컨트롤러
 */
export class EditorController {
  private state: EditorState;
  private listeners: ((state: EditorState) => void)[] = [];

  constructor(gridConfig: GridConfig, site?: Site) {
    this.state = createInitialEditorState(gridConfig, site);
  }

  /**
   * Action Dispatch
   * Action을 받아 Rule 검증 후 상태 업데이트
   */
  dispatch = (action: EditorAction): RuleValidationResult => {
    // 1. Rule 검증
    const validationResult = this.validateAction(action);

    if (!validationResult.valid) {
      return validationResult;
    }

    // 2. 상태 업데이트
    this.state = this.applyAction(action, this.state);

    // 3. 리스너에게 상태 변경 알림
    this.notifyListeners();

    // 4. 성공 결과 반환
    return validationResult;
  };

  private validateAction(action: EditorAction): RuleValidationResult {
    const currentPage = this.state.site.pages.find(
      (p) => p.id === this.state.currentPageId
    );
    const sections = currentPage?.sections || [];

    const selectedSection = this.state.selection.selectedSectionId
      ? sections.find((s) => s.id === this.state.selection.selectedSectionId)
      : sections[0];

    const context: EditorRuleContext = {
      blocks: selectedSection?.blocks || [],
      selectedBlockIds: Array.from(this.state.selection.selectedBlockIds),
      gridConfig: this.state.gridConfig,
      sections: sections,
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
