import { api } from '../../instance';
import { API_PATH } from '../../path';

export interface SendEmailVerificationCodeRequest {
  email: string;
}

export const sendEmailVerificationCode = async (
  data: SendEmailVerificationCodeRequest
) => {
  const response = await api.post(
    API_PATH.auth.sendEmailVerificationCode,
    data
  );
  return response.data;
};

// ------------------------------------------------------------

export interface VerifyEmailVerificationCodeRequest {
  email: string;
  code: string;
}

export const verifyEmailVerificationCode = async (
  data: VerifyEmailVerificationCodeRequest
) => {
  const response = await api.post(
    API_PATH.auth.verifyEmailVerificationCode,
    data
  );
  return response.data;
};

// ------------------------------------------------------------

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
}

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await api.post(API_PATH.auth.resetPassword, data);
  return response.data;
};
