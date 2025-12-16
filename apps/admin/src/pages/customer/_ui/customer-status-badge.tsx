import { Badge } from '@redotlabs/ui';
import type { RedotUserStatus } from '@repo/types';

const CustomerStatusBadge = ({ status }: { status: RedotUserStatus }) => {
  const color = (() => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'BANNED':
        return 'warning';
      case 'DELETED':
        return 'danger';
      default:
        return 'secondary';
    }
  })();

  const label = (() => {
    switch (status) {
      case 'ACTIVE':
        return '활성';
      case 'BANNED':
        return '차단';
      case 'DELETED':
        return '탈퇴';
      default:
        return '알수없음';
    }
  })();

  return (
    <Badge size="sm" color={color} className="w-fit">
      {label}
    </Badge>
  );
};

export default CustomerStatusBadge;
