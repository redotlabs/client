import { Badge, Button } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { Card } from '@repo/ui';
import { Receipt } from 'lucide-react';
import React from 'react';
import PaymentMethodButton from '../ui/payment-method-button';

const CurrentPlanSection = ({ data }: any) => {
  const { currentPlan, pageViewsUsed, pageViewsLimit } = data;
  const usagePercentage = (pageViewsUsed / pageViewsLimit) * 100;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-4">현재 플랜</h2>
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold">{currentPlan} 플랜</h3>
              <Badge>활성</Badge>
            </div>
            <p className="text-gray-500 mt-1">다음 결제일: 2025년 12월 1일</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">₩29,000</p>
            <p className="text-gray-500 text-sm">/월</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">페이지뷰 사용량</span>
            <span className="text-sm text-gray-500">
              {pageViewsUsed.toLocaleString()} /{' '}
              {pageViewsLimit.toLocaleString()}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">
            {usagePercentage.toFixed(1)}% 사용 중 · 이번 달{' '}
            {(pageViewsLimit - pageViewsUsed).toLocaleString()} 남음
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <PaymentMethodButton />
          <Button variant="outlined" className="flex items-center gap-2">
            <Receipt size={16} />
            청구서 다운로드
          </Button>
        </div>
      </Card>
    </section>
  );
};

const Progress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div className={cn('h-2 bg-gray-200 rounded-full', className)}>
      <div
        className="h-full bg-primary-500 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default CurrentPlanSection;
