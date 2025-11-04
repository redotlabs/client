import { PATH } from '@/shared/constants/routes';
import { Logo } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const EnduserHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-white px-8 lg:px-20 h-12.5 lg:h-17.5 flex items-center justify-between border-b border-gray-200 shrink-0">
      <Link href={PATH.root} className="flex items-center gap-2">
        <Logo className="w-auto h-6" />
        <span className="font-medium">Blog</span>
      </Link>
    </header>
  );
};

export default EnduserHeader;
