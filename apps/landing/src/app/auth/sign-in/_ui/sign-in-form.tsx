'use client';

import { Button, toast } from '@redotlabs/ui';
import { Loader, RHFInput } from '@repo/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignIn } from '@/shared/api/queries/auth';
import { PATH } from '@/shared/constants/routes';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';

const schema = z.object({
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
});

export default function SignInForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const signInMutation = useSignIn();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    return signInMutation.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeyFactory.auth.me,
        });
        const redirectPath = searchParams.get('redirect');
        router.push(redirectPath || PATH.root);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const disabled = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <div className="mt-15 flex flex-col gap-6 w-full">
      {/* 일반 로그인 */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <RHFInput
            name="email"
            label="Email"
            placeholder="example@example.com"
          />
          <RHFInput
            name="password"
            label="Password"
            type="password"
            placeholder="password"
          />

          <Button type="submit" className="mt-10" disabled={disabled}>
            {signInMutation.isPending ? (
              <Loader className="size-6 text-white" />
            ) : (
              '로그인'
            )}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
