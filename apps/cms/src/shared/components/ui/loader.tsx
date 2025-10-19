import { cn } from '@redotlabs/utils';
import { LoaderCircleIcon } from 'lucide-react';

const Loader = ({ className = '' }: { className?: string }) => {
  return (
    <div className="size-full flex-1 flex items-center justify-center text-primary-500">
      <LoaderCircleIcon className={cn('size-10 animate-spin', className)} />
    </div>
  );
};

export default Loader;
