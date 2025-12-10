'use client';

import { Button } from '@redotlabs/ui';
import { Card } from '@repo/ui';
import {
  Code,
  Layout,
  Palette,
  Zap,
  MousePointerClick,
  ExternalLink,
  Sparkles,
  Layers,
  Wand2,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { extractSubdomain } from '@repo/utils';

const FEATURES = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: '드래그 앤 드롭 편집',
    description:
      '직관적인 드래그 앤 드롭 인터페이스로 페이지를 쉽게 구성하고 레이아웃을 자유롭게 변경할 수 있습니다.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: '실시간 디자인 커스터마이징',
    description:
      '색상, 폰트, 간격 등을 실시간으로 조정하고 즉시 미리보기를 확인할 수 있습니다.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: '컴포넌트 기반 구조',
    description:
      '재사용 가능한 컴포넌트를 활용하여 일관된 디자인과 빠른 개발을 지원합니다.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '빠른 성능',
    description:
      '최적화된 렌더링으로 빠른 로딩 속도와 부드러운 사용자 경험을 제공합니다.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: '반응형 디자인',
    description:
      '모바일, 태블릿, 데스크톱 등 모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃을 지원합니다.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: '고급 기능',
    description:
      '애니메이션, 인터랙션, 폼 등 다양한 고급 기능을 쉽게 추가할 수 있습니다.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
];

const SiteContentPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();

  const getBuilderUrl = () => {
    if (typeof window === 'undefined') return '';
    const { origin } = window.location;

    // path 기반 subdomain인 경우
    return `https://${subdomain}.redotlabs.me/builder`;
    // return `${origin}/builder`;
  };

  const handleOpenBuilder = () => {
    const builderUrl = getBuilderUrl();
    if (builderUrl) {
      window.open(builderUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className="p-10 container mx-auto flex-1">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-6 shadow-lg">
          <Wand2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          빌더로 사이트 디자인하기
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          직관적인 드래그 앤 드롭 인터페이스로 원하는 대로 사이트를 디자인하고
          커스터마이징하세요
        </p>
        <Button
          variant="contained"
          size="lg"
          onClick={handleOpenBuilder}
          className="flex items-center gap-2 mx-auto text-lg px-8 py-6"
        >
          <ExternalLink className="w-5 h-5" />
          빌더 열기 (새 창)
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 ${feature.color}`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      {/* How It Works Section */}
      <Card className="p-8 mb-16 bg-gradient-to-br from-primary-50 to-primary-100/50">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-primary-900">작동 방식</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2 text-primary-900">빌더 열기</h3>
            <p className="text-gray-700 text-sm">
              위의 버튼을 클릭하여 빌더를 새 창에서 엽니다.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2 text-primary-900">디자인 편집</h3>
            <p className="text-gray-700 text-sm">
              드래그 앤 드롭으로 컴포넌트를 추가하고 레이아웃을 조정합니다.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2 text-primary-900">
              저장 및 발행
            </h3>
            <p className="text-gray-700 text-sm">
              변경사항을 저장하고 즉시 사이트에 반영합니다.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default SiteContentPage;
