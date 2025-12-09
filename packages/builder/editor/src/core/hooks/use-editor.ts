import { useState, useEffect, useRef, useMemo } from 'react';
import { EditorController } from '@/core/controller';
import type { EditorState } from '@/core/state';
import type { GridConfig, PageContent } from '@repo/builder/renderer';

/**
 * useEditor Hook
 * EditorController를 React에서 사용할 수 있게 하는 Hook
 *
 * TODO: 전역 상태 관리로 전환 필요
 */
export function useEditor(
  gridConfig: GridConfig,
  content: PageContent,
  onChange?: (content: PageContent) => void
) {
  const controllerRef = useRef<EditorController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new EditorController(gridConfig, content);
  }

  const controller = controllerRef.current;

  const [state, setState] = useState<EditorState>(controller.getState());
  const [isDirty, setIsDirty] = useState(controller.getIsDirty());

  useEffect(() => {
    const unsubscribe = controller.subscribe((newState) => {
      setState(newState);
      setIsDirty(controller.getIsDirty());
      // Call onChange callback when state changes
      if (onChange) {
        onChange(newState.content);
      }
    });

    return unsubscribe;
  }, [controller, onChange]);

  const dispatch = useMemo(() => controller.dispatch, [controller]);

  return {
    state,
    isDirty,
    dispatch,
    controller,
  };
}
