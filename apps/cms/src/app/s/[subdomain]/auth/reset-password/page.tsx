'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordStepProvider } from './hooks/reset-password-step.hook';
import StepRenderer from './ui/step-renderer';
import { VerifyEmailCodeProvider } from './hooks/verify-email-code.hook';
import { Logo } from '@redotlabs/ui';

const schema = z
  .object({
    email: z
      .email('이메일 형식이 일치하지 않습니다.')
      .min(1, '이메일을 입력해주세요.'),
    code: z.string().min(6, '인증코드를 6자리를 입력해주세요.'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 입력해주세요.'),
  })
  .superRefine((data, ctx) => {
    const { password, passwordConfirm } = data;
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
      });
    }
  });

export default function ResetPasswordPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <main className="flex flex-col items-center justify-center h-svh">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 rounded-4xl shadow-[0_0_18px_0_rgba(0,0,0,0.08)] flex flex-col items-center">
        <Logo className="mt-8" />
        <h1 className="mt-9 text-3xl font-bold text-gray-800">
          비밀번호 재설정
        </h1>

        <VerifyEmailCodeProvider>
          <ResetPasswordStepProvider>
            <FormProvider {...form}>
              <form className="flex flex-col size-full">
                <StepRenderer />
              </form>
            </FormProvider>
          </ResetPasswordStepProvider>
        </VerifyEmailCodeProvider>
      </div>
    </main>
  );
}
