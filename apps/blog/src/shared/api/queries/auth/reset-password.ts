import { useMutation } from '@tanstack/react-query';
import {
  resetPassword,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from '@/shared/api/services/auth/reset-password';

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
