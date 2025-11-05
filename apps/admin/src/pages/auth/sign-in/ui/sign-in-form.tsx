import { PATH } from '@/shared/routes';
import { Button, toast } from '@redotlabs/ui';
import { RHFInput } from '@repo/ui';
import { Link, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@/shared/api/queries/auth';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';
import { useNavigate } from 'react-router-dom';

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
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const signInMutation = useSignIn();

  const onSubmit = (data: z.infer<typeof schema>) => {
    return signInMutation.mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeyFactory.auth.me,
        });
        const redirectPath = searchParams.get('redirect');
        const isExternalPath = redirectPath && !redirectPath.startsWith('/');
        if (isExternalPath) {
          window.location.href = redirectPath;
        } else {
          navigate(redirectPath || PATH.root);
        }
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const disabled =
    signInMutation.isPending ||
    !form.formState.isValid ||
    form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-15 flex flex-col gap-3 w-full"
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

        <div className="flex flex-col gap-5">
          <Button type="submit" className="mt-25" disabled={disabled}>
            {signInMutation.isPending ? (
              <Loader2 className="size-6 text-white animate-spin" />
            ) : (
              '로그인'
            )}
          </Button>
          <Link to={PATH.auth.resetPassword} className="w-full text-center">
            <Button
              size="sm"
              variant="text"
              className="p-0 text-base font-bold text-gray-600 underline"
            >
              비밀번호 초기화
            </Button>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
