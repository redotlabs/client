import { useState, useEffect, useRef, useMemo } from 'react';
import { EditorController } from './editor-controller';
import type { EditorState } from './state';
import type { BuilderBlock, GridConfig } from '@/shared/types';

/**
 * useEditor Hook
 * EditorController를 React에서 사용할 수 있게 하는 Hook
 */
export function useEditor(blocks: BuilderBlock[], gridConfig: GridConfig) {
  // EditorController 인스턴스 (한 번만 생성)
  const controllerRef = useRef<EditorController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new EditorController(blocks, gridConfig);
  }

  const controller = controllerRef.current;

  // 상태 구독
  const [state, setState] = useState<EditorState>(controller.getState());

  useEffect(() => {
    const unsubscribe = controller.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, [controller]);

  // dispatch 함수를 메모이제이션
  const dispatch = useMemo(() => controller.dispatch, [controller]);

  return {
    state,
    dispatch,
    controller,
  };
}
