import { InquiryStatus } from '@/shared/types';
import { Badge, BadgeProps } from '@redotlabs/ui';
import React from 'react';

interface InquiryStatusBadgeProps extends BadgeProps {
  status: InquiryStatus;
}

const InquiryStatusBadge = ({ status, ...props }: InquiryStatusBadgeProps) => {
  const badgeColor = (() => {
    switch (status) {
      case 'UNPROCESSED':
        return 'danger';
      case 'COMPLETED':
        return 'success';
      default:
        return 'danger';
    }
  })();

  const badgeLabel = (() => {
    switch (status) {
      case 'UNPROCESSED':
        return '미처리';
      case 'COMPLETED':
        return '처리완료';
      default:
        return '미처리';
    }
  })();

  return (
    <Badge color={badgeColor} size="sm" {...props} className="w-fit">
      {badgeLabel}
    </Badge>
  );
};

export default InquiryStatusBadge;
