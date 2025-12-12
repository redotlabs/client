import type { ComponentProps } from 'react';
import { cn } from '@redotlabs/utils';

const Skeleton = ({ className = '', ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('bg-gray-100 animate-pulse rounded-md', className)}
      {...props}
    />
  );
};

export default Skeleton;
