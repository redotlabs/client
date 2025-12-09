import React from 'react';
import Image from 'next/image';
import { Button } from '@redotlabs/ui';
import { ArrowUpIcon } from '@/shared/components/ui/icons';
import { PATH } from '@/shared/constants/routes';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
      <Image
        src="/assets/main-graphic.gif"
        alt="main-graphic"
        width={1440}
        height={687}
        className="w-full max-h-[560px] object-cover"
      />
      {/* <video
        src="/assets/main-graphic.mp4"
        width={1440}
        height={687}
        autoPlay
        muted
        loop
        className="w-full h-[560px] object-cover"
      /> */}

      <div className="flex flex-col px-8 lg:px-20 pt-12 pb-20">
        <h2 className="text-gray-700 text-2xl md:text-5xl lg:text-6xl font-medium">
          낡은 홈페이지부터 신규 제작까지
          <br />
          미래의 모습으로.
        </h2>

        <div className="mt-10 flex flex-col md:flex-row gap-4 md:gap-6 w-fit">
          <Link href={PATH.consultation.new}>
            <Button className="flex items-center gap-6 px-8">
              <ArrowUpIcon />
              홈페이지 신규 제작
            </Button>
          </Link>
          <Link href={PATH.consultation.renewal}>
            <Button className="flex items-center gap-6 px-8">
              <ArrowUpIcon />
              기존 페이지 리뉴얼
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
