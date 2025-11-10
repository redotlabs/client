import { useState, useEffect, useRef, useMemo } from 'react';
import { EditorController } from '@/core/controller';
import type { EditorState } from '@/core/state';
import type { Section, GridConfig } from '@/shared/types';

/**
 * useEditor Hook
 * EditorController를 React에서 사용할 수 있게 하는 Hook
 *
 * TODO: 전역 상태 관리로 전환 필요
 */
export function useEditor(gridConfig: GridConfig, sections: Section[]) {
  const controllerRef = useRef<EditorController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new EditorController(gridConfig, sections);
  }

  const controller = controllerRef.current;

  const [state, setState] = useState<EditorState>(controller.getState());

  useEffect(() => {
    const unsubscribe = controller.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, [controller]);

  const dispatch = useMemo(() => controller.dispatch, [controller]);

  return {
    state,
    dispatch,
    controller,
  };
}
