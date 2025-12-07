import type { ComponentProps } from 'react';
import { cn } from '@redotlabs/utils';

const Skeleton = ({ className = '', ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('bg-gray-200 animate-pulse rounded-md', className)}
      {...props}
    />
  );
};

export default Skeleton;
