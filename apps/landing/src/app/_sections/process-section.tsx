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
        Redot은 어떤 서비스를 제공하나요?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ProcessCard
          title="홈페이지 리뉴얼, 신규제작"
          description={
            <>
              5년 이상 된 홈페이지가 있거나, 홈페이지 신규제작이 필요하다면
              Redot에서 최적의 디자인과 합리적인 유지비를 경험할 수 있어요.
            </>
          }
        />
        <ProcessCard
          title="데이터 가공 및 자동화 툴 제작"
          description={
            <>
              대량의 내부 데이터 가공과 자동화 툴을 제공해드려요. 맞춤형 툴을
              도입하여 압도적인 생산성을 경험해 보세요.
            </>
          }
        />
        <ProcessCard
          title="보안 점검 및 컨설팅"
          description={
            <>
              최근 화두인 보안 이슈에 대해 보안 점검 및 컨설팅을 진행하고 더욱
              안전한 서비스가 될 수 있도록 도와드려요.
            </>
          }
        />
      </div>
    </section>
  );
};

export default ProcessSection;
