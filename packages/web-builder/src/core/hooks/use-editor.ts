import { useState, useEffect, useRef, useMemo } from 'react';
import { EditorController } from '@/core/controller';
import type { EditorState } from '@/core/state';
import type { Site, GridConfig } from '@repo/renderer';

/**
 * useEditor Hook
 * EditorController를 React에서 사용할 수 있게 하는 Hook
 *
 * TODO: 전역 상태 관리로 전환 필요
 */
export function useEditor(
  gridConfig: GridConfig,
  site?: Site,
  onChange?: (site: Site) => void
) {
  const controllerRef = useRef<EditorController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new EditorController(gridConfig, site);
  }

  const controller = controllerRef.current;

  const [state, setState] = useState<EditorState>(controller.getState());

  useEffect(() => {
    const unsubscribe = controller.subscribe((newState) => {
      setState(newState);
      // Call onChange callback when state changes
      if (onChange) {
        onChange(newState.site);
      }
    });

    return unsubscribe;
  }, [controller, onChange]);

  const dispatch = useMemo(() => controller.dispatch, [controller]);

  return {
    state,
    dispatch,
    controller,
  };
}
