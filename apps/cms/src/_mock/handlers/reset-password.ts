import { API_PATH } from '@/shared/api/path';
import { delay, http, HttpResponse } from 'msw';
import { MOCK_ACCOUNT, MOCK_EMAIL_CODE } from '../utils/constants';
import { MOCK_API_BASE } from '../utils/constants';
import {
  ResetPasswordRequest,
  SendEmailVerificationCodeRequest,
  VerifyEmailVerificationCodeRequest,
} from '@/shared/api/services/auth/reset-password';

const resetPasswordHandlers = () => [
  http.post(
    MOCK_API_BASE + API_PATH.auth.sendEmailVerificationCode,
    _sendEmailVerificationCode
  ),
  http.post(
    MOCK_API_BASE + API_PATH.auth.verifyEmailVerificationCode,
    _verifyEmailVerificationCode
  ),
  http.post(MOCK_API_BASE + API_PATH.auth.resetPassword, _resetPassword),
];

const _sendEmailVerificationCode: Parameters<
  typeof http.post<never, SendEmailVerificationCodeRequest>
>[1] = async ({ request }) => {
  await delay(1000);
  const { email } = await request.json();

  if (email === MOCK_ACCOUNT.email) {
    return HttpResponse.json({ code: MOCK_EMAIL_CODE });
  }

  return HttpResponse.json(
    { message: '이메일 정보가 일치하지 않습니다.' },
    { status: 401 }
  );
};

const _verifyEmailVerificationCode: Parameters<
  typeof http.post<never, VerifyEmailVerificationCodeRequest>
>[1] = async ({ request }) => {
  await delay(1000);
  const { email, code } = await request.json();

  if (email === MOCK_ACCOUNT.email && code === MOCK_EMAIL_CODE) {
    return HttpResponse.json({});
  }

  return HttpResponse.json(
    { message: '인증코드가 일치하지 않습니다.' },
    { status: 401 }
  );
};

const _resetPassword: Parameters<
  typeof http.post<never, ResetPasswordRequest>
>[1] = async ({ request }) => {
  await delay(1000);
  const { email, code, password } = await request.json();

  if (
    email === MOCK_ACCOUNT.email &&
    code === MOCK_EMAIL_CODE &&
    password === MOCK_ACCOUNT.password
  ) {
    return HttpResponse.json({});
  }

  return HttpResponse.json(
    { message: '비밀번호 재설정에 실패했습니다.' },
    { status: 401 }
  );
};

export default resetPasswordHandlers();
