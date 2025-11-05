import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  RHFInput,
  Loader,
  DialogDescription,
} from '@repo/ui';
import { Button, toast } from '@redotlabs/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useCreateAdmin } from '@/shared/api/queries/admin';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 일치하지 않습니다.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      '비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.'
    ),
  profileImageUrl: z.string().nullable(),
});

const CreateAdminButton = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      profileImageUrl: null,
    },
    mode: 'onChange',
  });

  const createAdminMutation = useCreateAdmin();

  const onClose = () => {
    form.reset();
    setOpen(false);
  };

  const onOpen = () => setOpen(true);

  const onOpenChange = (open: boolean) => (open ? onOpen() : onClose());

  const onSubmit = (data: z.infer<typeof schema>) => {
    createAdminMutation.mutate(data, {
      onSuccess: () => {
        toast.success('관리자가 추가되었습니다.');
        onClose();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const disabled = createAdminMutation.isPending || form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={createAdminMutation.isPending}>
          관리자 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>추가할 관리자 정보를 입력해주세요.</DialogTitle>
          <DialogDescription className="text-gray-500">
            프로필 이미지는 생성 후 설정할 수 있습니다.
          </DialogDescription>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 flex flex-col gap-3"
            >
              <RHFInput name="name" label="이름" />
              <RHFInput name="email" label="이메일" />
              <RHFInput name="password" type="password" label="비밀번호" />

              <div className="mt-10 flex justify-end gap-3">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={onClose}
                  disabled={createAdminMutation.isPending}
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
                  {createAdminMutation.isPending ? (
                    <Loader className="size-5 text-white" />
                  ) : (
                    '추가하기'
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

export default CreateAdminButton;
