import { PATH } from '@/shared/constants/routes';
import { Logo } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const EnduserHeader = () => {
  return (
    <header className="p-4 flex items-center justify-between border-b border-gray-200">
      <Link href={PATH.root}>
        <Logo type="logo" className="w-24" />
      </Link>
    </header>
  );
};

export default EnduserHeader;
