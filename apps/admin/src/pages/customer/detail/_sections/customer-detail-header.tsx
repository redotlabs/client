import { Button, toast } from '@redotlabs/ui';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CustomerStatusBadge } from '@/pages/customer/_ui';
import type { RedotUser } from '@repo/types';
import { CustomerBanButton, CustomerDeleteButton } from '@/pages/customer/_ui';
import { useFormContext } from 'react-hook-form';
import { useUpdateCustomer } from '@/shared/api/queries/customer';
import { Loader } from '@repo/ui';

interface CustomerDetailHeaderProps {
  customer?: RedotUser;
}

const CustomerDetailHeader = ({ customer }: CustomerDetailHeaderProps) => {
  const navigate = useNavigate();
  const updateMutation = useUpdateCustomer();

  const { handleSubmit } = useFormContext<{ name: string }>();

  const onSave = (data: { name: string }) => {
    if (!customer) return;

    updateMutation.mutate(
      {
        id: customer?.id,
        name: data.name,
        status: customer.status,
        profileImageUrl: customer.profileImageUrl ?? null,
      },
      {
        onSuccess: () => {
          toast.success('고객 정보가 수정되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-4">
        <Button
          variant="text"
          size="sm"
          onClick={() => navigate('/customer')}
          className="text-black p-0"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">고객 정보</h1>
          {customer && (
            <span className="text-primary-500">#{customer?.id}</span>
          )}
          {customer && <CustomerStatusBadge status={customer?.status} />}
        </div>
      </div>

      {/* 상태 버튼들 */}
      {customer && (
        <div className="flex items-center gap-2">
          <CustomerBanButton customer={customer} />
          <CustomerDeleteButton customer={customer} />
          <Button
            variant="outlined"
            size="sm"
            className="px-2 flex items-center gap-2"
            onClick={handleSubmit(onSave)}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <Loader className="size-5 text-primary-500" />
            ) : (
              <>
                <Pencil size={16} />
                저장
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailHeader;
