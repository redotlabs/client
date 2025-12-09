import { Logo } from '@redotlabs/ui';
import React from 'react';
import Image from 'next/image';

const OptionCard = ({
  thumbnail,
  title,
  description,
}: {
  thumbnail: string;
  title: string;
  description: string[];
}) => {
  return (
    <div className="flex flex-col lg:flex-row p-6 rounded-lg border border-gray-200 gap-12 md:gap-16">
      <Image
        src={thumbnail}
        alt={title}
        width={488}
        height={285}
        className="object-cover w-full lg:max-w-[488px]"
      />
      <div>
        <div className="bg-blue-100 rounded-full flex gap-4 items-center px-6 py-2.5 w-fit">
          <Logo.Symbol className="size-8" variant="solid" />
          <span className="text-gray-700 text-xl md:text-2xl font-medium">
            {title}
          </span>
        </div>
        <ul className="mt-6 lg:mt-15 text-gray-700 flex flex-col gap-2">
          {description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const OptionsSection = () => {
  return (
    <section className="p-8 md:p-20 flex flex-col justify-center">
      <div className="mx-auto overflow-hidden">
        <video
          src="/assets/logo-graphic.mp4"
          width={500}
          height={200}
          autoPlay
          muted
          loop
          className="scale-101"
          playsInline
        />
      </div>
      <h2 className="mt-10 text-gray-700 text-2xl md:text-4xl font-medium text-center">
        다양한 옵션으로 기능을 확장하세요
      </h2>

      <div className="mt-10 flex flex-col md:flex-row lg:flex-col gap-6">
        <OptionCard
          thumbnail="/assets/options/option1.png"
          title="기본 제공 기능"
          description={[
            '반응형 디자인',
            'CMS 제공',
            'SEO 최적화',
            '보안서버(SSL) 설치',
          ]}
        />
        <OptionCard
          thumbnail="/assets/options/option2.png"
          title="추가 기능"
          description={[
            '게시판',
            '문의/신청 폼',
            '다국어 지원',
            '예약 및 결제 시스템',
          ]}
        />
      </div>
    </section>
  );
};

export default OptionsSection;
