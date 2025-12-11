import { useUpdateConsultation } from '@/shared/api/queries/consultation';
import { Button } from '@redotlabs/ui';
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

interface ConsultationDeleteButtonProps {
  consultation: Consultation;
}

const ConsultationDeleteButton = ({
  consultation,
}: ConsultationDeleteButtonProps) => {
  const dialog = useDialog();

  const updateMutation = useUpdateConsultation();

  const onDelete = () => {
    console.log('상담 요청 삭제:', consultation.id);
    alert('삭제 기능 구현 필요');
  };

  // 처리중일 때는 모달 닫기 막음
  const isOpen = updateMutation.isPending || dialog.isOpen;

  return (
    <Dialog open={isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상담 요청 삭제</DialogTitle>
          <DialogDescription>상담 요청을 삭제하시겠습니까?</DialogDescription>
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
            onClick={onDelete}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader className="size-5 text-white" />
            ) : (
              '네, 삭제할게요'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDeleteButton;
