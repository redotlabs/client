import SignInForm from './ui/sign-in-form';
import { Logo } from '@redotlabs/ui';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 rounded-4xl shadow-[0_0_18px_0_rgba(0,0,0,0.08)] bg-white flex flex-col items-center">
        <Logo className="mt-8" />
        <h1 className="mt-9 text-3xl font-bold text-primary-800">로그인</h1>

        <SignInForm />

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
      </div>
    </main>
  );
}

