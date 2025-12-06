import { Logo } from '@redotlabs/ui';
import React, { type ReactNode } from 'react';

const ProcessCard = ({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg">
      <Logo.Symbol className="size-10" variant="solid" />
      <h3 className="mt-6 text-gray-600 text-xl font-semibold">{title}</h3>
      <p className="mt-9 lg:pb-11 text-gray-600">{description}</p>
    </div>
  );
};

const ProcessSection = () => {
  return (
    <section className="p-8 md:p-20 bg-primary-200 flex flex-col gap-10">
      <h2 className="text-gray-600 text-2xl lg:text-4xl font-medium">
        낡은 홈페이지부터 신규 제작까지 미래의 모습으로.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ProcessCard
          title="AI 데이터 분석"
          description={
            <>
              성공적인 웹사이트는 데이터에서 시작됩니다.
              <br />
              경쟁사 분석, 타겟 고객 분석, SEO 전략까지 AI가 최적의 방향을
              제시합니다
            </>
          }
        />
        <ProcessCard
          title="전문가 맞춤 제작"
          description={
            <>
              AI의 분석을 바탕으로
              <br />
              숙련된 기획자, 디자이너, 개발자 팀이 브랜드 가치를 극대화하는
              맞춤형 웹사이트를 제작합니다.
            </>
          }
        />
        <ProcessCard
          title="간편한 CMS"
          description={
            <>
              제작 후에도 개발자 없이 직접 콘텐츠를 관리하세요.
              <br />
              워드처럼 쉬운 관리자 페이지(CMS)로 지속적인 성장을 돕습니다.
            </>
          }
        />
      </div>
    </section>
  );
};

export default ProcessSection;
