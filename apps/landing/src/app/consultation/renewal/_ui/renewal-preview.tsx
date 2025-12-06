'use client';

import { useState, useEffect } from 'react';
import { Button } from '@redotlabs/ui';

interface RenewalPreviewProps {
  websiteUrl: string;
  onNext: (pageJson: string) => void;
  onBack: () => void;
}

export default function RenewalPreview({
  websiteUrl,
  onNext,
  onBack,
}: RenewalPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  // 실제로는 AI 기반 미리보기를 로드하는 로직이 들어갈 수 있습니다
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 여기서는 예시로 JSON 데이터를 생성합니다
  const handleNext = () => {
    // AI가 생성한 페이지 JSON 예시
    const mockPageJson = JSON.stringify({
      sections: [
        {
          type: 'hero',
          title: '리뉴얼된 홈페이지',
          subtitle: '현대적이고 깔끔한 디자인',
        },
      ],
    });
    onNext(mockPageJson);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          리뉴얼 미리보기
        </h2>
        <p className="text-gray-600">
          AI가 분석한 귀하의 홈페이지 리뉴얼 미리보기입니다.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm text-gray-600 mb-1">기존 홈페이지</p>
        <p className="font-medium text-gray-900 break-all">{websiteUrl}</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">
              리뉴얼 미리보기를 생성하고 있습니다...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 미리보기 섹션 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">
                리뉴얼된 디자인 미리보기
              </h3>
              <p className="text-blue-100">
                현대적이고 깔끔한 디자인으로 재탄생한 홈페이지
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mb-3 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    반응형 디자인
                  </h4>
                  <p className="text-sm text-gray-600">
                    모든 기기에서 완벽하게 작동하는 반응형 레이아웃
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-full mb-3 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    빠른 로딩 속도
                  </h4>
                  <p className="text-sm text-gray-600">
                    최적화된 이미지와 코드로 빠른 페이지 로딩
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full mb-3 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    SEO 최적화
                  </h4>
                  <p className="text-sm text-gray-600">
                    검색 엔진에 최적화된 구조로 방문자 증가
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  주요 개선 사항
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>사용자 경험(UX)을 고려한 직관적인 네비게이션</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>현대적인 타이포그래피와 색상 조합</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>고품질 이미지와 애니메이션 효과</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>명확한 콜투액션(CTA) 버튼 배치</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              💡 이 미리보기는 AI가 생성한 예시입니다. 실제 상담을 통해 귀사의
              브랜드에 맞는 맞춤형 디자인을 제공해드립니다.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outlined"
          onClick={onBack}
          className="flex-1"
        >
          이전 단계
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={isLoading}
          className="flex-1"
        >
          상담 요청하기
        </Button>
      </div>
    </div>
  );
}

