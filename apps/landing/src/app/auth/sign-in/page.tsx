import { Suspense } from 'react';
import GoogleSignInButton from './_ui/google-sign-in-button';
import SignInForm from './_ui/sign-in-form';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 flex flex-col items-center">
        <h1 className="mt-9 text-3xl font-bold text-primary-800">로그인</h1>

        <Suspense>
          <SignInForm />
        </Suspense>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            아직 계정이 없으신가요?{' '}
            <Link
              href="/auth/sign-up"
              className="text-primary-500 font-semibold hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>

        {/* 구분선 */}
        <div className="my-6 relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col gap-3 w-full">
          <Suspense>
            <GoogleSignInButton />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
