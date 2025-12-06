import { ArrowUpIcon } from '@/shared/components/ui/icons';
import { PATH } from '@/shared/constants/routes';
import { Button } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const BusinessSection = () => {
  return (
    <section className="p-5 md:p-10 lg:p-20 bg-[url('/assets/pattern-graphic.png')] bg-center bg-cover">
      <p className="mt-[288px] text-gray-700 text-2xl md:text-5xl lg:text-6xl font-semibold">
        이제, 당신의 비즈니스가
        <br />
        빛날 차례입니다.
      </p>

      <p className="mt-9 text-gray-700 text-lg md:text-xl font-medium">
        망설이지 마세요. &nbsp;
        <br className="md:hidden" />
        무료 상담만으로도 비즈니스의 새로운 가능성을 발견할 수 있습니다.
      </p>

      <Link href={PATH.consultation.new}>
        <Button className="mt-8 mb-40 flex items-center gap-6 px-8">
          <ArrowUpIcon />
          무료 상담하기
        </Button>
      </Link>
    </section>
  );
};

export default BusinessSection;
