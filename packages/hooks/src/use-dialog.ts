import { useCallback, useState } from 'react';

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);

  return { isOpen, onOpen, onClose, onOpenChange };
};
