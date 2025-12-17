import type { RedotUser } from '@repo/types';
import { RHFInput } from '@repo/ui';
import { User } from 'lucide-react';
import { format } from 'date-fns';
import { Image } from '@/shared/components/ui';

interface CustomerFormProps {
  customer: RedotUser;
}

const CustomerForm = ({ customer }: CustomerFormProps) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-base font-bold">프로필 사진</span>
        <Image
          src={customer.profileImageUrl ?? ''}
          alt="프로필 사진"
          className="size-20 rounded-full outline outline-1 outline-gray-200"
          fallback={
            <div className="size-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="size-10 text-gray-400" />
            </div>
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">가입일시</label>
        <p className="text-base text-gray-800">
          {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
        </p>
      </div>

      <RHFInput name="name" label="이름" />

      <div>
        <label className="text-base font-bold">이메일</label>
        <p className="mt-2 text-base text-gray-800 h-12 flex items-center">
          {customer.email}
        </p>
      </div>
    </div>
  );
};

export default CustomerForm;
