import { useDialog } from '@repo/hooks';
import { useDeleteCustomer } from '@/shared/api/queries/customer';
import { toast } from '@redotlabs/ui';
import type { CustomerDto } from '@/shared/api/services/customer';
import { Button } from '@redotlabs/ui';
import { Trash2 } from 'lucide-react';
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

interface CustomerDeleteButtonProps {
  customer: CustomerDto;
}

const CustomerDeleteButton = ({ customer }: CustomerDeleteButtonProps) => {
  const dialog = useDialog();
  const deleteMutation = useDeleteCustomer();

  const onDelete = () => {
    deleteMutation.mutate(customer.id, {
      onSuccess: () => {
        toast.success('고객 정보가 삭제되었습니다.');
        dialog.onClose();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };
  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outlined"
          size="sm"
          className="px-2 flex items-center gap-2 text-red-500 border-red-500"
        >
          <Trash2 size={16} />
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>고객 정보 삭제</DialogTitle>
          <DialogDescription>
            삭제된 고객 정보는 <strong>복구할 수 없습니다.</strong>
            <br />
            고객 정보를 삭제하시겠습니까?
          </DialogDescription>
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
            onClick={onDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
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

export default CustomerDeleteButton;
