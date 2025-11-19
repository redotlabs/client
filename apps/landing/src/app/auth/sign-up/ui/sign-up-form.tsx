'use client';

import { Button } from '@redotlabs/ui';
import { RHFInput } from '@repo/ui';
import { Loader2 } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
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
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log('회원가입:', data);
    // TODO: API 호출
    // 성공 시 대시보드로 이동
    router.push('/dashboard');
  };

  const disabled = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-3 w-full"
      >
        <RHFInput name="name" label="이름" placeholder="홍길동" />
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
        <RHFInput
          name="passwordConfirm"
          label="Password 확인"
          type="password"
          placeholder="password"
        />

        <Button type="submit" className="mt-10" disabled={disabled}>
          {form.formState.isSubmitting ? (
            <Loader2 className="size-6 text-white animate-spin" />
          ) : (
            '회원가입'
          )}
        </Button>
      </form>
    </FormProvider>
  );
}

