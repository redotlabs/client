import { Button, Input, toast } from '@redotlabs/ui';
import { Upload } from 'lucide-react';
import { usePageStore, type PageKey } from '@/features/page/store';
import { useEditorContext } from '@repo/builder/editor';
import { useCreatePageVersion } from '@/shared/api/queries/app';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui';
import { useDialog } from '@repo/hooks';
import { useState } from 'react';
import { usePageStateManager } from '@/features/page/manager';

export const DraftButton = () => {
  const { currentPageKey, storedContentsMap, addedKeys, appendAddedKeys } =
    usePageStore();
  const [remark, setRemark] = useState('');
  const { state, isDirty } = useEditorContext();
  const dialog = useDialog();
  const publishMutation = useCreatePageVersion();
  const { pages: savedPages } = usePageStateManager();

  const shouldUpdate = (key: PageKey) => key === currentPageKey && isDirty;

  const getContent = (key: PageKey) => {
    return shouldUpdate(key) ? state.content : storedContentsMap[key];
  };

  // 현재 페이지 동기화 시키자
  const getPayload = () => {
    if (isDirty) {
      appendAddedKeys(currentPageKey!);
    }
    const pages = savedPages.map((page) => ({
      ...page,
      content: getContent(page.key),
    }));

    const added = pages
      .filter((page) => addedKeys.has(page.key))
      .map(({ id, ...rest }) => rest);
    const retained = pages
      .filter((page) => !addedKeys.has(page.key))
      .filter(({ id }) => !!id)
      .map(({ id }) => ({ id: id! }));

    return {
      status: 'DRAFT',
      remark,
      retained,
      added,
    } as const;
  };

  const handlePublish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    publishMutation.mutate(getPayload(), {
      onSuccess: () => {
        toast.success('페이지가 성공적으로 임시저장되었습니다.');
        dialog.onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="contained"
          size="sm"
          className="flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" />
          임시저장
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>페이지 임시저장</DialogTitle>
          <DialogDescription>페이지를 임시저장하시겠습니까?</DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <Input
            placeholder="비고 (선택)"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outlined" size="sm">
              취소
            </Button>
          </DialogClose>
          <Button variant="contained" size="sm" onClick={handlePublish}>
            임시저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DraftButton;
