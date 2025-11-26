import SignUpForm from './ui/sign-up-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 flex flex-col items-center">
        <h1 className="mt-9 text-3xl font-bold text-primary-800">회원가입</h1>
        <p className="mt-2 text-sm text-gray-600">
          첫 번째 서비스는 무료로 시작하세요
        </p>

        <SignUpForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/auth/sign-in"
              className="text-primary-500 font-semibold hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
