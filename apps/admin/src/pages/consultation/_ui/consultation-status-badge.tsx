import { Badge } from '@redotlabs/ui';
import type { ConsultationStatus } from '@repo/types';

interface ConsultationStatusBadgeProps {
  status: ConsultationStatus;
}

const ConsultationStatusBadge = ({ status }: ConsultationStatusBadgeProps) => {
  const badgeColor = (() => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  })();

  const badgeLabel = (() => {
    switch (status) {
      case 'PENDING':
        return '미처리';
      case 'IN_PROGRESS':
        return '진행중';
      case 'COMPLETED':
        return '완료';
      case 'CANCELLED':
        return '취소';
      default:
        return '알수없음';
    }
  })();

  return (
    <Badge color={badgeColor} size="sm" className="w-fit">
      {badgeLabel}
    </Badge>
  );
};

export default ConsultationStatusBadge;
