import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { RHFInput, RHFSelect } from '@repo/ui';
import { useQueryClient } from '@tanstack/react-query';
import type { GetCustomersParams } from '@/shared/api/services/customer';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import type { RedotUserStatus } from '@repo/types';
import { Button } from '@redotlabs/ui';

const STATUS_OPTIONS: { label: string; value: RedotUserStatus | '' }[] = [
  { label: '전체', value: '' },
  { label: '활성', value: 'ACTIVE' },
  { label: '차단', value: 'BANNED' },
  { label: '탈퇴', value: 'DELETED' },
];

const SOCIAL_PROVIDER_OPTIONS: { label: string; value: 'GOOGLE' | '' }[] = [
  { label: '전체', value: '' },
  { label: 'Google', value: 'GOOGLE' },
];

interface CustomerTableToolbarProps {
  setParams: Dispatch<SetStateAction<GetCustomersParams>>;
  disabled: boolean;
}

const CustomerTableToolbar = ({
  setParams,
  disabled,
}: CustomerTableToolbarProps) => {
  const queryClient = useQueryClient();

  const form = useForm<GetCustomersParams>({
    defaultValues: {
      name: '',
      email: '',
      socialProvider: '',
      status: '',
    },
  });

  const onSubmit = (data: GetCustomersParams) => {
    let newParams;

    setParams((prev) => {
      newParams = {
        ...prev,
        ...data,
      };
      return newParams;
    });

    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.customer.list(newParams),
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 py-4 flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-end">
          <div className="flex gap-5">
            <RHFSelect
              name="status"
              placeholder="전체"
              label="상태"
              labelPlacement="left"
              options={STATUS_OPTIONS}
              size="sm"
            />
            <RHFSelect
              name="socialProvider"
              placeholder="전체"
              label="소셜 로그인"
              labelPlacement="left"
              options={SOCIAL_PROVIDER_OPTIONS}
              size="sm"
            />
            <RHFInput
              size="sm"
              name="name"
              label="이름"
              placeholder="이름을 입력해주세요."
              labelPlacement="left"
            />
            <RHFInput
              size="sm"
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              labelPlacement="left"
            />
          </div>
          <Button type="submit" size="sm" disabled={disabled}>
            검색
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerTableToolbar;
