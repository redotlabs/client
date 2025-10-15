import { useMutation } from '@tanstack/react-query';
import { sendEmailVerificationCode } from '../../services/auth/reset-password';
import { verifyEmailVerificationCode } from '../../services/auth/reset-password';
import { resetPassword } from '../../services/auth/reset-password';

export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: sendEmailVerificationCode,
  });
};

export const useVerifyEmailVerificationCode = () => {
  return useMutation({
    mutationFn: verifyEmailVerificationCode,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
