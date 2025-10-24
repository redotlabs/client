import type { KeyboardEventHandler, HandlerContext } from './types';
import { deselectBlock, deleteBlock } from '@/core/actions';
import { getSelectedBlockIds } from '@/core/state';

/**
 * Keyboard Handler
 * 키보드 입력을 처리하는 핸들러
 */
export const keyboardHandler: KeyboardEventHandler = {
  name: 'keyboard',
  enabled: true,

  handle: (event: KeyboardEvent, context: HandlerContext) => {
    const { state, dispatch } = context;

    switch (event.key) {
      case 'Escape': {
        // ESC: 선택 해제
        event.preventDefault();
        dispatch(deselectBlock());
        break;
      }

      case 'Delete':
      case 'Backspace': {
        // Delete/Backspace: 선택된 블록 삭제
        event.preventDefault();
        const selectedIds = getSelectedBlockIds(state);
        selectedIds.forEach((id) => {
          dispatch(deleteBlock(id));
        });
        break;
      }

      case 'a':
      case 'A': {
        // Ctrl/Cmd + A: 전체 선택 (TODO: 추후 구현)
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: 전체 블록 선택 액션
        }
        break;
      }

      case 'z':
      case 'Z': {
        // Ctrl/Cmd + Z: Undo (TODO: 추후 구현)
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: Undo 액션
        }
        break;
      }

      case 'y':
      case 'Y': {
        // Ctrl/Cmd + Y: Redo (TODO: 추후 구현)
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          // TODO: Redo 액션
        }
        break;
      }

      default:
        break;
    }
  },
};
