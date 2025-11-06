import { PATH } from '@/shared/constants/routes';
import { Button } from '@redotlabs/ui';
import { TenantLink } from '@repo/tenant-router/next';
import Image from 'next/image';

const SuccessStep = () => {
  const noCache = Date.now();

  return (
    <>
      <div className="size-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-9">
          <Image
            src={`/assets/success.gif?${noCache}`}
            alt="success"
            width={160}
            height={160}
            className="size-32"
          />

          <p className="text-center text-gray-800">
            비밀번호 재설정이 완료되었어요.
            <br />
            로그인 페이지로 이동하여 로그인해주세요.
          </p>
        </div>
      </div>

      <TenantLink href={PATH.auth.signIn} replace className="mt-5 w-full">
        <Button className="w-full">로그인 페이지로 이동하기</Button>
      </TenantLink>
    </>
  );
};

export default SuccessStep;
