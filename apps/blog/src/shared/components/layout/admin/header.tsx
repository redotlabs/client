/* eslint-disable @next/next/no-img-element */
'use client';

import { useMe } from '@/shared/api/queries/auth/sign-in';
import { PATH } from '@/shared/constants/routes';
import { Logo } from '@redotlabs/ui';
import Link from 'next/link';
import React from 'react';

const AdminHeader = () => {
  const { data } = useMe();

  return (
    <header className="sticky top-0 z-10 bg-white px-8 lg:px-20 h-12.5 lg:h-17.5 flex items-center justify-between border-b border-gray-200 shrink-0">
      <Link href={PATH.root} className="flex items-end gap-2">
        <Logo className="w-auto h-6" />
        <span className="font-medium">Blog</span>
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src={data?.profileImageUrl ?? ''}
            alt={data?.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-medium">{data?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
