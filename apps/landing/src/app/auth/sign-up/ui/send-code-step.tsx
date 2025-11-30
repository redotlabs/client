import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useVerifyEmailCode } from '../hooks/verify-email-code.hook';
import { useSignUpStep } from '../hooks/sign-up-step.hook';
import { useSendEmailVerificationCode } from '@/shared/api/queries/auth';
import { RHFInput } from '@repo/ui';
import { Button, toast } from '@redotlabs/ui';
import { minutes } from '@repo/utils';
import { PATH } from '@/shared/constants/routes';
import Link from 'next/link';

const SendCodeStep = () => {
  const { setStep } = useSignUpStep();
  const { isVerified, setEndAt } = useVerifyEmailCode();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const email = useWatch({ control, name: 'email' });

  const { mutate, isPending } = useSendEmailVerificationCode();

  const sendCode = () => {
    if (disabled) return;

    mutate(
      { email, purpose: 'redot-member-sign-up' },
      {
        onSuccess: () => {
          setStep('verify-code');
          setEndAt(Date.now() + minutes(3));
          toast.success('인증코드가 전송되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendCode();
    }
  };

  const disabled = !email || !!errors.email || isPending;

  return (
    <>
      <p className="mt-2 text-gray-500 text-center">회원가입을 완료해주세요</p>
      <div className="mt-8 grow flex flex-col">
        <RHFInput
          autoFocus
          name="email"
          label="Email"
          inputMode="email"
          placeholder="이메일을 입력해주세요."
          disabled={isVerified}
          autoComplete="email"
          onKeyUp={onKeyUp}
        />
        {isVerified && (
          <div className="flex items-center text-sm text-green-600">
            <span className="ml-2">이메일이 인증되었습니다.</span>
          </div>
        )}
      </div>

      <Button onClick={sendCode} className="mt-auto" disabled={disabled}>
        {isPending ? '인증코드 전송 중..' : '인증코드 전송'}
      </Button>

      <Link href={PATH.auth.signIn} replace className="mt-5 w-full text-center">
        <Button
          size="sm"
          variant="text"
          className="p-0 text-base font-bold text-gray-600 underline"
        >
          로그인 페이지로 돌아가기
        </Button>
      </Link>
    </>
  );
};

export default SendCodeStep;
