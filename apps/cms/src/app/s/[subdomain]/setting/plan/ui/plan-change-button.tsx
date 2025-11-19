import {
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui';
import { Button, Checkbox } from '@redotlabs/ui';
import React from 'react';
import { PLANS } from '../sections/compare-plan-section';

interface PlanChangeButtonProps {
  plan: {
    name: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
  };
  currentPlan: string;
}

const PlanChangeButton = ({ plan, currentPlan }: PlanChangeButtonProps) => {
  const isCurrentPlan = currentPlan === plan.name;
  const currentPlanData = PLANS.find((p) => p.name === currentPlan);

  // 업그레이드인지 다운그레이드인지 판단 (UI 표시용)
  const isUpgrade =
    currentPlanData && plan.price > currentPlanData.price && !isCurrentPlan;
  const isDowngrade =
    currentPlanData && plan.price < currentPlanData.price && !isCurrentPlan;

  // 더미 데이터 (실제로는 API에서 가져올 데이터)
  const mockChangeDetails = {
    effectiveDate: '2025년 12월 1일',
    proratedAmount: 15000,
    nextBillingDate: '2025년 12월 1일',
    nextBillingAmount: plan.price,
    addedFeatures: isUpgrade ? ['무제한 포스트', '고급 분석', '우선 지원'] : [],
    removedFeatures: isDowngrade ? ['고급 분석', '우선 지원'] : [],
    usageWarnings: isDowngrade
      ? [
          {
            type: '포스트 수',
            current: '150개',
            limit: '100개',
            action: '50개의 포스트를 삭제하거나 보관해야 합니다',
          },
        ]
      : [],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full mt-6"
          variant={isCurrentPlan ? 'outlined' : 'contained'}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? '현재 플랜' : '플랜 선택'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>플랜 변경 확인</DialogTitle>
          <DialogDescription>
            플랜을 변경하기 전에 아래 내용을 확인해주세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 플랜 변경 요약 */}
          <Card className="bg-gray-100">
            <h3 className="font-semibold mb-3 text-sm text-gray-700">
              플랜 변경 요약
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600">현재 플랜</p>
                <p className="font-semibold text-lg">
                  {currentPlanData?.name || '무료'}
                </p>
                <p className="text-sm text-gray-600">
                  ₩{currentPlanData?.price.toLocaleString() || 0}/월
                </p>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">새 플랜</p>
                <p className="font-semibold text-lg">{plan.name}</p>
                <p className="text-sm text-gray-600">
                  ₩{plan.price.toLocaleString()}/월
                </p>
              </div>
            </div>
          </Card>

          {/* 업그레이드/다운그레이드 배지 */}
          {isUpgrade && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-sm font-medium text-blue-600">
                업그레이드
              </span>
            </div>
          )}

          {isDowngrade && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
              <span className="text-sm font-medium text-amber-600">
                다운그레이드
              </span>
            </div>
          )}

          {/* 비용 정보 */}
          <Card>
            <h3 className="font-semibold text-sm text-gray-700">비용 안내</h3>
            <div className="space-y-2 text-sm">
              {isUpgrade && (
                <div className="flex justify-between">
                  <span className="text-gray-600">추가 청구 (일할 계산)</span>
                  <span className="font-medium">
                    ₩{mockChangeDetails.proratedAmount.toLocaleString()}
                  </span>
                </div>
              )}
              {isDowngrade && (
                <div className="flex justify-between">
                  <span className="text-gray-600">환불 예정 금액</span>
                  <span className="font-medium text-green-600">
                    ₩{mockChangeDetails.proratedAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">다음 청구일</span>
                <span className="font-medium">
                  {mockChangeDetails.nextBillingDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">다음 청구 금액</span>
                <span className="font-semibold text-lg">
                  ₩{mockChangeDetails.nextBillingAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* 적용 시점 */}
          <Card>
            <h3 className="font-semibold text-sm text-gray-700 mb-2">
              적용 시점
            </h3>
            <p className="text-sm text-gray-600">
              {isUpgrade
                ? '플랜은 즉시 적용되며, 추가 요금은 지금 청구됩니다.'
                : '플랜 변경은 현재 결제 주기가 종료되는 시점에 적용됩니다.'}
            </p>
            <p className="text-sm font-medium mt-2">
              예정일: {mockChangeDetails.effectiveDate}
            </p>
          </Card>

          {/* 기능 변경사항 */}
          {(mockChangeDetails.addedFeatures.length > 0 ||
            mockChangeDetails.removedFeatures.length > 0) && (
            <Card>
              <h3 className="font-semibold text-sm text-gray-700 mb-3">
                기능 변경사항
              </h3>
              <div className="space-y-3">
                {mockChangeDetails.addedFeatures.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-600 mb-2">추가되는 기능</p>
                    <ul className="space-y-1">
                      {mockChangeDetails.addedFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-green-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {mockChangeDetails.removedFeatures.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-600 mb-2">제한되는 기능</p>
                    <ul className="space-y-1">
                      {mockChangeDetails.removedFeatures.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-red-600"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 사용량 경고 (다운그레이드시) */}
          {mockChangeDetails.usageWarnings.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-red-800 mb-2">
                    현재 사용량이 새 플랜의 제한을 초과합니다
                  </h3>
                  <ul className="space-y-2">
                    {mockChangeDetails.usageWarnings.map((warning, index) => (
                      <li key={index} className="text-sm">
                        <p className="font-medium text-red-700">
                          {warning.type}: {warning.current} (제한:{' '}
                          {warning.limit})
                        </p>
                        <p className="text-red-600 mt-1">{warning.action}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 약관 동의 */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Checkbox id="agree-terms" />
            <label htmlFor="agree-terms" className="cursor-pointer">
              플랜 변경에 따른{' '}
              <a href="#" className="text-blue-600 hover:underline">
                환불 정책
              </a>
              과{' '}
              <a href="#" className="text-blue-600 hover:underline">
                이용 약관
              </a>
              에 동의합니다
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outlined" size="sm">
              취소
            </Button>
          </DialogClose>
          <Button
            variant="contained"
            size="sm"
            disabled={mockChangeDetails.usageWarnings.length > 0}
          >
            {isUpgrade
              ? '업그레이드'
              : isDowngrade
                ? '다운그레이드'
                : '플랜 변경'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanChangeButton;
