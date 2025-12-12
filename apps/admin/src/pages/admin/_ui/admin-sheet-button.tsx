import { useDeleteAdmin, useUpdateAdmin } from '@/shared/api/queries/admin';
import type { Admin } from '@/shared/types';
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
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import ResetPasswordButton from './reset-password-button';
import AdminUploadProfileImage from './upload-profile-image';

interface AdminSheetButtonProps extends PropsWithChildren {
  admin: Admin;
}

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 일치하지 않습니다.'),
  profileImageUrl: z.string().nullable(),
});

const AdminSheetButton = ({ admin, children }: AdminSheetButtonProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
      profileImageUrl: admin.profileImageUrl ?? null,
    },
    mode: 'onChange',
  });

  const deleteMutation = useDeleteAdmin();
  const updateMutation = useUpdateAdmin();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      ...data,
      id: admin.id,
    };
    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('관리자 정보가 수정되었습니다.');
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const onDelete = () => {
    const ok = confirm('관리자를 삭제하시겠습니까?');
    if (!ok) return;
    deleteMutation.mutate(
      { id: admin.id },
      {
        onSuccess: () => {
          toast.success('관리자 정보가 삭제되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg"
        aria-describedby={undefined}
      >
        <SheetHeader className="p-0 text-xl">
          <SheetTitle>관리자 정보</SheetTitle>
        </SheetHeader>

        <div className="mt-10">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3 w-fit">
                <label className="text-base font-bold">프로필 사진</label>
                <AdminUploadProfileImage />
              </div>

              <RHFInput name="name" label="이름" />
              <RHFInput name="email" label="이메일" />

              <ResetPasswordButton admin={admin} />

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

export default AdminSheetButton;
