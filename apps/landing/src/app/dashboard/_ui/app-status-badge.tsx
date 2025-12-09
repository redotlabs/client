import { Badge } from '@redotlabs/ui';
import { RedotAppStatus } from '@repo/types';
import React from 'react';

const AppStatusBadge = ({ status }: { status: RedotAppStatus }) => {
  const color = (() => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'danger';
      default:
        return 'danger';
    }
  })();

  const label = (() => {
    switch (status) {
      case 'ACTIVE':
        return '활성';
      case 'INACTIVE':
        return '비활성';
      default:
        return '비활성';
    }
  })();

  return (
    <Badge size="sm" color={color} className="w-fit">
      {label}
    </Badge>
  );
};

export default AppStatusBadge;
