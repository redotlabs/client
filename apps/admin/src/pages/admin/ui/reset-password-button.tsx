import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  RHFInput,
  Loader,
} from '@repo/ui';
import { Button, toast } from '@redotlabs/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState } from 'react';
import { useResetPassword } from '@/shared/api/queries/admin';
import type { Admin } from '@/shared/types';

const schema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      '비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.'
    ),
});

const ResetPasswordButton = ({ admin }: { admin: Admin }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: '' },
    mode: 'onChange',
  });

  const resetPasswordMutation = useResetPassword();

  const onClose = () => {
    form.reset();
    setOpen(false);
  };

  const onOpen = () => setOpen(true);

  const onOpenChange = (open: boolean) => (open ? onOpen() : onClose());

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      id: admin.id,
      password: data.password,
    };
    resetPasswordMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('비밀번호가 재설정되었습니다.');
        onClose();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const disabled =
    resetPasswordMutation.isPending || form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={resetPasswordMutation.isPending}>
          비밀번호 재설정
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>비밀번호 재설정</DialogTitle>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 flex flex-col gap-3"
            >
              <RHFInput
                name="password"
                type="password"
                label="새 비밀번호"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />

              <div className="mt-10 flex justify-end gap-3">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={onClose}
                  disabled={resetPasswordMutation.isPending}
                  className="w-20"
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={disabled}
                  className="w-20"
                >
                  {resetPasswordMutation.isPending ? (
                    <Loader className="size-5 text-white" />
                  ) : (
                    '재설정'
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordButton;
