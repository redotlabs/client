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
    <header className="p-4 flex items-center justify-between border-b border-gray-200">
      <Link href={PATH.admin.root}>
        <Logo type="logo" className="w-24" />
      </Link>
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
    </header>
  );
};

export default AdminHeader;
