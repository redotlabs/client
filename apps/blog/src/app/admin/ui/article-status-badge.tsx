import { ArticleStatus } from '@/shared/types/article';
import { Badge } from '@redotlabs/ui';
import React from 'react';

interface ArticleStatusBadgeProps {
  status: ArticleStatus;
  size?: 'sm' | 'md' | 'lg';
}

const ArticleStatusBadge = ({
  status,
  size = 'md',
}: ArticleStatusBadgeProps) => {
  const badgeColor = (() => {
    switch (status) {
      case 'DRAFT':
        return 'secondary';
      case 'PUBLISHED':
        return 'success';
      case 'ARCHIVED':
        return 'warning';
      case 'DELETED':
        return 'danger';
    }
  })();

  const badgeLabel = (() => {
    switch (status) {
      case 'DRAFT':
        return '작성중';
      case 'PUBLISHED':
        return '게시';
      case 'ARCHIVED':
        return '보관';
      case 'DELETED':
        return '삭제';
    }
  })();

  return (
    <Badge color={badgeColor} size={size}>
      {badgeLabel}
    </Badge>
  );
};

export default ArticleStatusBadge;
