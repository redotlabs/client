import type { PageVersion } from '@/shared/api/services/app';
import { Badge, Button } from '@redotlabs/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui';
import { useDialog } from '@repo/hooks';
import { usePageStore } from '@/features/page/store';
import { Check } from 'lucide-react';

interface VersionButtonProps {
  version: PageVersion;
  index: number;
}

const VersionButton = ({ version, index }: VersionButtonProps) => {
  const dialog = useDialog();
  const {
    selectedVersion,
    setSelectedVersion,
    clearStoredPagesMap,
    clearStoredContentsMap,
    clearAddedKeys,
  } = usePageStore();

  const onSelect = () => {
    clearStoredPagesMap();
    clearStoredContentsMap();
    clearAddedKeys();
    setSelectedVersion(index);
    dialog.onClose();
  };

  const isSelected = selectedVersion === index;

  return (
    <>
      <Button
        variant="text"
        size="sm"
        onClick={isSelected ? undefined : () => dialog.onOpen()}
        className="flex items-center gap-2 px-3! py-1.5!"
      >
        v{index + 1}: {version.remark}
        <Badge size="sm">{version.status}</Badge>
        {isSelected && <Check className="w-4 h-4 text-primary-600" />}
      </Button>

      {/* Modal */}
      <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              v{index + 1}: {version.remark}
            </DialogTitle>
            <DialogDescription>
              버전을 바꾸시면 현재 페이지 내용이 초기화됩니다.
              <br />
              버전을 바꾸시겠습니까?
            </DialogDescription>
            <DialogFooter>
              <Button variant="outlined" size="sm" onClick={dialog.onClose}>
                취소
              </Button>
              <Button variant="contained" size="sm" onClick={onSelect}>
                바꾸기
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VersionButton;
