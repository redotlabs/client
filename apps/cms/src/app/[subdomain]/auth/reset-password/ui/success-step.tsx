import { PATH } from '@/shared/constants/routes';
import { Button } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const SuccessStep = () => {
  return (
    <>
      <div className="size-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-9">
          {/* ! Will change correct icon image */}
          <div className="size-24 bg-gray-300 rounded-lg" />

          <p className="text-center text-gray-800">
            비밀번호 재설정이 완료되었어요.
            <br />
            로그인 페이지로 이동하여 로그인해주세요.
          </p>
        </div>
      </div>

      <Link replace href={PATH.auth.signIn} className="mt-5 w-full">
        <Button className="w-full">로그인 페이지로 이동하기</Button>
      </Link>
    </>
  );
};

export default SuccessStep;
