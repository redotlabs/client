import { RHFInput } from '@repo/ui';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTimer } from '@repo/hooks';
import { useSignUpStep } from '../hooks/sign-up-step.hook';
import { useVerifyEmailCode } from '../hooks/verify-email-code.hook';
import {
  useSendEmailVerificationCode,
  useVerifyEmailVerificationCode,
} from '@/shared/api/queries/auth';
import { formatTimer, minutes } from '@repo/utils';
import { Button, toast } from '@redotlabs/ui';
import Link from 'next/link';
import { PATH } from '@/shared/constants/routes';

const VerifyCodeStep = () => {
  const { setStep } = useSignUpStep();
  const { endAt, setEndAt, setIsVerified } = useVerifyEmailCode();
  const { timer, isTimerCompleted, setTimer } = useTimer(endAt);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const code = useWatch({ control, name: 'code' });
  const email = getValues('email');

  const sendMutation = useSendEmailVerificationCode();
  const verifyMutation = useVerifyEmailVerificationCode();

  const verifyEmail = () => {
    if (disabled) return;

    verifyMutation.mutate(
      { email, code, purpose: 'redot-member-sign-up' },
      {
        onSuccess: ({ verificationToken }) => {
          setStep('sign-up');
          setEndAt(null);
          setTimer(null);
          setIsVerified(true);
          setValue('verificationToken', verificationToken);
          toast.success('이메일이 인증되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const sendEmail = () => {
    if (verifyMutation.isPending) return;

    sendMutation.mutate(
      { email, purpose: 'redot-member-sign-up' },
      {
        onSuccess: () => {
          setValue('code', '');
          setEndAt(Date.now() + minutes(3));
          toast.success('인증코드가 재전송되었습니다.');
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      verifyEmail();
    }
  };

  const disabled = !code || !!errors.code || verifyMutation.isPending;

  // 이메일 보내고 1.5m 지난 경우
  const isShowResendButton =
    isTimerCompleted || (timer && timer < minutes(1.5));

  return (
    <>
      <p className="mt-2 text-gray-500 text-center">
        {email}으로 인증코드 6자리를 보냈어요
      </p>
      <div className="mt-8 grow flex flex-col">
        <RHFInput
          autoFocus
          name="code"
          maxLength={6}
          inputMode="decimal"
          label="인증코드"
          placeholder="인증코드를 6자리를 입력해주세요."
          onKeyUp={onKeyUp}
        />
        <div className="flex flex-col items-end mt-1 text-sm">
          {timer && (
            <p className="text-red-500 font-semibold tabular-nums">
              {formatTimer(timer)}
            </p>
          )}
          {isTimerCompleted && (
            <p className="text-red-500 text-xs font-semibold">
              인증번호가 만료되었습니다.
            </p>
          )}
          {isShowResendButton &&
            (sendMutation.isPending ? (
              <span className="text-xs text-gray-800">
                인증번호 재요청 중..
              </span>
            ) : (
              <div className="text-xs text-gray-800">
                이메일이 오지 않았나요?{' '}
                <Button
                  size="sm"
                  variant="text"
                  className="text-xs underline p-0 text-gray-800 h-auto"
                  onClick={sendEmail}
                >
                  재전송
                </Button>
              </div>
            ))}
        </div>
      </div>

      <Button onClick={verifyEmail} className="mt-5" disabled={disabled}>
        {verifyMutation.isPending ? '인증 중입니다..' : '다음'}
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

export default VerifyCodeStep;
