import React from 'react';
import { RHFInput } from '@repo/ui';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button, toast } from '@redotlabs/ui';
import { useSignUp } from '@/shared/api/queries/auth';
import { useSignUpStep } from '../hooks/sign-up-step.hook';
import { PATH } from '@/shared/constants/routes';
import Link from 'next/link';

const SignUpStep = () => {
  const { setStep } = useSignUpStep();
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const pw = useWatch({ control, name: 'password' });
  const pw2 = useWatch({ control, name: 'passwordConfirm' });

  const { mutate, isPending } = useSignUp();

  const onSubmit = () => {
    const [email, password, name, verificationToken] = getValues([
      'email',
      'password',
      'name',
      'verificationToken',
    ]);

    mutate(
      { email, password, name, verificationToken },
      {
        onSuccess: () => {
          setStep('success');
          toast.success('회원가입이 완료되었습니다.');
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
      <p className="mt-2 text-gray-500 text-center">회원가입을 완료해주세요</p>
      <div className="mt-8 grow flex flex-col gap-9">
        <RHFInput
          autoFocus
          type="password"
          name="password"
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자를 포함한 8자리 이상"
          autoComplete="password"
          onKeyUp={onKeyUp}
        />
        <RHFInput
          type="password"
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          autoComplete="password"
          onKeyUp={onKeyUp}
        />
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        className="mt-5"
        disabled={disabled}
      >
        {isPending ? '회원가입 중입니다..' : '회원가입하기'}
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

export default SignUpStep;
