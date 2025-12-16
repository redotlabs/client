import { useDeleteAdmin, useUpdateAdmin } from '@/shared/api/queries/admin';
import type { CustomerDto } from '@/shared/api/services/customer';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, toast } from '@redotlabs/ui';
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  RHFInput,
  Loader,
} from '@repo/ui';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { Image } from '@/shared/components/ui';
import { User } from 'lucide-react';

interface CustomerSheetButtonProps {
  customer: CustomerDto;
}

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 일치하지 않습니다.'),
  profileImageUrl: z.string().nullable(),
});

const CustomerSheetButton = ({ customer }: CustomerSheetButtonProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      profileImageUrl: customer.profileImageUrl ?? null,
    },
    mode: 'onChange',
  });

  const deleteMutation = useDeleteAdmin();
  const updateMutation = useUpdateAdmin();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      ...data,
      id: customer.id,
    };
    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('고객 정보가 수정되었습니다.');
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const onDelete = () => {
    const ok = confirm('고객을 삭제하시겠습니까?');
    if (!ok) return;
    deleteMutation.mutate(
      { id: customer.id },
      {
        onSuccess: () => {
          toast.success('고객 정보가 삭제되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="text" size="sm" className="p-0 underline">
          {customer.id}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg"
        aria-describedby={undefined}
      >
        <SheetHeader className="p-0 text-xl">
          <SheetTitle>고객 정보</SheetTitle>
        </SheetHeader>

        <div className="mt-10">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3 w-fit">
                <label className="text-base font-bold">프로필 사진</label>
                <Image
                  src={customer.profileImageUrl ?? ''}
                  alt="프로필 사진"
                  className="size-20 rounded-full"
                  fallback={
                    <div className="size-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="size-10 text-gray-400" />
                    </div>
                  }
                />
              </div>

              <RHFInput name="name" label="이름" />
              <RHFInput name="email" label="이메일" disabled />

              <div className="mt-auto flex justify-end gap-3">
                <Button
                  size="sm"
                  variant="outlined"
                  disabled={deleteMutation.isPending}
                  className="w-20"
                  onClick={onDelete}
                >
                  {deleteMutation.isPending ? (
                    <Loader className="size-5 text-white" />
                  ) : (
                    '삭제'
                  )}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={updateMutation.isPending}
                  className="w-20"
                >
                  {updateMutation.isPending ? (
                    <Loader className="size-5 text-white" />
                  ) : (
                    '수정하기'
                  )}
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
