import { useUpdateConsultation } from '@/shared/api/queries/consultation';
import { Button, toast } from '@redotlabs/ui';
import type { Consultation } from '@repo/types';
import {
  Loader,
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@repo/ui';
import { Trash2 } from 'lucide-react';
import { useDialog } from '@repo/hooks';

interface ConsultationCancelButtonProps {
  consultation: Consultation;
}

const ConsultationCancelButton = ({
  consultation,
}: ConsultationCancelButtonProps) => {
  const dialog = useDialog();

  const updateMutation = useUpdateConsultation();

  const onCancel = () => {
    const payload = {
      ...consultation,
      status: 'CANCELLED',
    } as const;
    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('상담 요청 취소 처리되었습니다.');
        dialog.onClose();
      },
      onError: (error) => {
        toast.error(error?.message || '상담 요청 취소 처리에 실패했습니다.');
      },
    });
  };
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          요청 취소하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상담 요청 취소</DialogTitle>
          <DialogDescription>상담 요청을 취소하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outlined" size="sm">
              닫기
            </Button>
          </DialogClose>
          <Button
            variant="contained"
            size="sm"
            onClick={onCancel}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader className="size-5 text-white" />
            ) : (
              '네, 취소할게요'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationCancelButton;
