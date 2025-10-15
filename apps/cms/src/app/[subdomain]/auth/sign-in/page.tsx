import SignInForm from './ui/sign-in-form';
import { Logo } from '@redotlabs/ui';

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center h-svh">
      <div className="lg:min-h-[672px] max-w-md w-full px-8 py-10 rounded-4xl shadow-[0_0_18px_0_rgba(0,0,0,0.08)] flex flex-col items-center">
        <Logo className="mt-8" />
        <h1 className="mt-9 text-3xl font-bold text-primary-800">로그인</h1>

        <SignInForm />
      </div>
    </main>
  );
}
