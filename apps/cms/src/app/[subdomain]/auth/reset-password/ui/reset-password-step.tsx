import React from 'react';
import { RHFInput } from '@repo/ui';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button, toast } from '@redotlabs/ui';
import { useResetPassword } from '@/shared/api/queries/auth/reset-password';
import { useResetPasswordStep } from '../hooks/reset-password-step.hook';
import Link from 'next/link';
import { PATH } from '@/shared/constants/routes';

const ResetPasswordStep = () => {
  const { setStep } = useResetPasswordStep();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const pw = useWatch({ control, name: 'password' });
  const pw2 = useWatch({ control, name: 'passwordConfirm' });

  const { mutate, isPending } = useResetPassword();

  const onSubmit = () => {
    const [email, code, password] = getValues(['email', 'code', 'password']);

    mutate(
      { email, code, password },
      {
        onSuccess: () => {
          setStep('success');
          toast.success('비밀번호가 재설정되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      handleSubmit(onSubmit)();
    }
  };

  const disabled =
    !pw || !pw2 || !!errors.password || !!errors.passwordConfirm || isPending;

  return (
    <>
      <p className="mt-2 text-gray-500 text-center">
        새 비밀번호를 입력해주세요
      </p>
      <div className="mt-8 grow flex flex-col gap-9">
        <RHFInput
          autoFocus
          type="password"
          name="password"
          label="새 비밀번호"
          placeholder="영문, 숫자, 특수문자를 포함한 8자리 이상"
          autoComplete="password"
          onKeyUp={onKeyUp}
        />
        <RHFInput
          autoFocus
          type="password"
          name="passwordConfirm"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 한 번 더 입력해주세요"
          autoComplete="password"
          onKeyUp={onKeyUp}
        />
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        className="mt-5"
        disabled={disabled}
      >
        {isPending ? '비밀번호 재설정 중입니다..' : '비밀번호 재설정하기'}
      </Button>

      <Link replace href={PATH.auth.signIn} className="mt-5 w-full text-center">
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

export default ResetPasswordStep;
