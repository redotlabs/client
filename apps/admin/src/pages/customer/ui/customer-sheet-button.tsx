'use client';

import type { Customer } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, toast } from '@redotlabs/ui';
import {
  Card,
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  RHFInput,
  RHFSelect,
} from '@repo/ui';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { format } from 'date-fns';
import { User, Mail, Phone, Building2, Calendar, Clock } from 'lucide-react';

interface CustomerSheetButtonProps extends PropsWithChildren {
  customer: Customer;
}

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 일치하지 않습니다.'),
  phone: z.string().min(1, '전화번호를 입력해주세요.'),
  company: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

const CustomerSheetButton = ({
  customer,
  children,
}: CustomerSheetButtonProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company || '',
      status: customer.status,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('고객 정보 수정:', { ...data, id: customer.id });
    toast.success('고객 정보가 수정되었습니다.');
    // TODO: API 호출
  };

  const onDelete = () => {
    const ok = confirm('고객을 삭제하시겠습니까?');
    if (!ok) return;
    console.log('고객 삭제:', customer.id);
    toast.success('고객이 삭제되었습니다.');
    // TODO: API 호출
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg overflow-y-auto"
        aria-describedby={undefined}
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-2xl font-bold text-primary-500">
            고객 #{customer.id}
          </SheetTitle>
          <p className="text-3xl font-bold text-gray-800">{customer.name}</p>
        </SheetHeader>

        <div className="mt-10">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* 기본 정보 */}
              <div className="space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <User size={18} />
                  기본 정보
                </h3>
                <RHFInput name="name" label="이름" />
                <RHFInput
                  name="email"
                  label="이메일"
                  startContent={<Mail size={16} className="text-gray-400" />}
                />
                <RHFInput
                  name="phone"
                  label="전화번호"
                  startContent={<Phone size={16} className="text-gray-400" />}
                />
                <RHFInput
                  name="company"
                  label="회사"
                  startContent={
                    <Building2 size={16} className="text-gray-400" />
                  }
                />
              </div>

              {/* 계정 상태 */}
              <div className="space-y-4">
                <h3 className="text-base font-bold">계정 상태</h3>
                <RHFSelect
                  name="status"
                  label="상태"
                  options={[
                    { label: '활성', value: 'active' },
                    { label: '비활성', value: 'inactive' },
                  ]}
                />
              </div>

              {/* 활동 정보 */}
              <div className="space-y-3">
                <h3 className="text-base font-bold">활동 정보</h3>
                <div className="flex gap-2">
                  <Card className="px-2.5 py-1.5 bg-white flex-1">
                    <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Calendar size={16} />
                      가입일
                    </label>
                    <p className="mt-2 text-sm text-gray-800">
                      {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
                    </p>
                  </Card>

                  {customer.lastLoginAt && (
                    <Card className="px-2.5 py-1.5 bg-white flex-1">
                      <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                        <Clock size={16} />
                        마지막 로그인
                      </label>
                      <p className="mt-2 text-sm text-gray-800">
                        {format(
                          new Date(customer.lastLoginAt),
                          'yyyy-MM-dd HH:mm'
                        )}
                      </p>
                    </Card>
                  )}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  size="sm"
                  variant="outlined"
                  color="danger"
                  className="w-20"
                  onClick={onDelete}
                  type="button"
                >
                  삭제
                </Button>
                <Button type="submit" size="sm" className="w-20">
                  수정하기
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomerSheetButton;

