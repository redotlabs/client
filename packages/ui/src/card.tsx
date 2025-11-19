import { cn } from '@redotlabs/utils';
import type { ComponentProps } from 'react';

const Card = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card"
      className={cn('border border-gray-200 rounded-lg p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
