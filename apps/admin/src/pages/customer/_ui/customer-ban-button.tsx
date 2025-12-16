import { useDialog } from '@repo/hooks';
import {
  Loader,
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@repo/ui';
import { useUpdateCustomer } from '@/shared/api/queries/customer';
import type { CustomerDto } from '@/shared/api/services/customer';
import { Button, toast } from '@redotlabs/ui';
import { Ban } from 'lucide-react';

interface CustomerBanButtonProps {
  customer: CustomerDto;
}

const CustomerBanButton = ({ customer }: CustomerBanButtonProps) => {
  const dialog = useDialog();
  const banMutation = useUpdateCustomer();

  const { id, name, profileImageUrl } = customer;

  const isBanned = customer.status === 'BANNED';
  const text = isBanned ? '차단 해제' : '차단';

  const onBan = () => {
    banMutation.mutate(
      { id, name, profileImageUrl, status: isBanned ? 'ACTIVE' : 'BANNED' },
      {
        onSuccess: () => {
          toast.success(`고객이 ${text} 처리되었습니다.`);
          dialog.onClose();
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outlined"
          size="sm"
          className="px-2 flex items-center gap-2 text-orange-500 border-orange-500"
        >
          <Ban size={16} />
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>고객 {text}</DialogTitle>
          <DialogDescription>고객을 {text}하시겠습니까?</DialogDescription>
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
            onClick={onBan}
            disabled={banMutation.isPending}
          >
            {banMutation.isPending ? (
              <Loader className="size-5 text-white" />
            ) : (
              `네, ${text}할게요`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerBanButton;
