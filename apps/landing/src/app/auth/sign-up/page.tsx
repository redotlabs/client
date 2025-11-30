'use client';

import z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailCodeProvider } from './hooks/verify-email-code.hook';
import { SignUpStepProvider } from './hooks/sign-up-step.hook';
import StepRenderer from './ui/step-renderer';

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

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-svh">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 flex flex-col items-center">
        <h1 className="mt-9 text-3xl font-bold text-primary-800">회원가입</h1>
        <p className="mt-2 text-sm text-gray-600">
          첫 번째 서비스는 무료로 시작하세요
        </p>

        <VerifyEmailCodeProvider>
          <SignUpStepProvider>
            <FormProvider {...form}>
              <form className="flex flex-col size-full gap-4">
                <StepRenderer />
              </form>
            </FormProvider>
          </SignUpStepProvider>
        </VerifyEmailCodeProvider>
      </div>
    </main>
  );
}
