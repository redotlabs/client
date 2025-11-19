import { Badge } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { Card } from '@repo/ui';
import { Check } from 'lucide-react';
import React from 'react';
import PlanChangeButton from './plan-change-button';

interface PlanCardProps {
  plan: {
    name: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
  };
  currentPlan: string;
}

const PlanCard = ({ plan, currentPlan }: PlanCardProps) => {
  return (
    <Card
      className={cn(
        'p-6 relative',
        plan.popular
          ? 'border-primary-500 border-2 shadow-lg'
          : 'border-gray-200'
      )}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          인기
        </Badge>
      )}
      <div className="text-center">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">
            ₩{plan.price.toLocaleString()}
          </span>
          <span className="text-gray-500">/월</span>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check
              size={20}
              className="text-primary-500 flex-shrink-0 mt-0.5"
            />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <PlanChangeButton plan={plan} currentPlan={currentPlan} />
    </Card>
  );
};

export default PlanCard;
