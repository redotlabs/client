import { Badge } from '@redotlabs/ui';
import type { ConsultationType } from '@repo/types';

interface ConsultationTypeBadgeProps {
  type: ConsultationType;
}

const ConsultationTypeBadge = ({ type }: ConsultationTypeBadgeProps) => {
  const badgeColor = (() => {
    switch (type) {
      case 'RENEWAL':
        return 'warning';
      case 'NEW':
        return 'info';
      default:
        return 'secondary';
    }
  })();

  const badgeLabel = (() => {
    switch (type) {
      case 'RENEWAL':
        return '리뉴얼';
      case 'NEW':
        return '신규';
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

export default ConsultationTypeBadge;
