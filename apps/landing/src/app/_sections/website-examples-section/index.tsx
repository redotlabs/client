'use client';

import { useViewport } from '@repo/hooks';
import WebsiteExampleCarousel from './carousel';
import WebsiteExampleList from './list';

const EXAMPLE_LIST = [
  {
    title: '기업/브랜드 홈페이지',
    thumbnail: '/assets/examples/example1.png',
    description:
      '회사의 비전과 서비스를 전문적으로 소개해 고객 신뢰를 구축하고,\n기업의 첫인상을 결정합니다.',
  },
  {
    title: '펜션 홈페이지',
    thumbnail: '/assets/examples/example2.png',
    description:
      '특정 제품이나 서비스의 장점을 집중적으로 어필하여\n잠재 고객의 구매 및 문의를 유도합니다.',
  },
  {
    title: '식당 홈페이지',
    thumbnail: '/assets/examples/example3.png',
    description:
      '특정 제품이나 서비스의 장점을 집중적으로 어필하여\n잠재 고객의 구매 및 문의를 유도합니다.',
  },
  {
    title: '학원 홈페이지',
    thumbnail: '/assets/examples/example4.png',
    description:
      '특정 제품이나 서비스의 장점을 집중적으로 어필하여\n잠재 고객의 구매 및 문의를 유도합니다.',
  },
];

const WebsiteExamplesSection = () => {
  const { isMobile } = useViewport();

  return (
    <section className="py-20 bg-gradient-to-t from-primary-500/40 to-white">
      <h2 className="text-gray-700 text-2xl lg:text-4xl font-medium text-center">
        어떤 홈페이지를 만들 수 있나요?
      </h2>

      <div className="mt-16">
        {isMobile ? (
          <WebsiteExampleList list={EXAMPLE_LIST} />
        ) : (
          <WebsiteExampleCarousel list={EXAMPLE_LIST} />
        )}
      </div>
      <div className="mt-10 flex flex-wrap md:flex-nowrap 2xl:justify-center gap-5 md:gap-9"></div>
    </section>
  );
};

export default WebsiteExamplesSection;
