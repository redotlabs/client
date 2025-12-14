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
import { Check } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useDialog } from '@repo/hooks';

interface ConsultationCompleteButtonProps {
  consultation: Consultation;
}

const ConsultationCompleteButton = ({
  consultation,
}: ConsultationCompleteButtonProps) => {
  const remark = useWatch({ name: 'remark' });
  const dialog = useDialog();

  const updateMutation = useUpdateConsultation();

  const onComplete = () => {
    const payload = {
      ...consultation,
      remark,
      status: 'COMPLETED',
    } as const;
    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('상담이 완료 처리되었습니다.');
        dialog.onClose();
      },
      onError: (error) => {
        toast.error(error?.message || '상담 완료 처리에 실패했습니다.');
      },
    });
  };

  // 처리중일 때는 모달 닫기 막음
  const isOpen = updateMutation.isPending || dialog.isOpen;

  return (
    <Dialog open={isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="contained"
          size="sm"
          className="flex items-center gap-2"
        >
          <Check size={16} />
          처리완료
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상담 완료 처리</DialogTitle>
          <DialogDescription>상담을 완료처리하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outlined" size="sm">
              취소
            </Button>
          </DialogClose>
          <Button
            variant="contained"
            size="sm"
            onClick={onComplete}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader className="size-5 text-white" />
            ) : (
              '네, 완료처리할게요'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationCompleteButton;
