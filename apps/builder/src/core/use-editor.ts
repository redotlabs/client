import { useState, useEffect, useRef, useMemo } from 'react';
import { EditorController } from './controller';
import type { EditorState } from './state';
import type { BuilderBlock, GridConfig } from '@/shared/types';

/**
 * useEditor Hook
 * EditorController를 React에서 사용할 수 있게 하는 Hook
 */
export function useEditor(blocks: BuilderBlock[], gridConfig: GridConfig) {
  const controllerRef = useRef<EditorController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new EditorController(blocks, gridConfig);
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
