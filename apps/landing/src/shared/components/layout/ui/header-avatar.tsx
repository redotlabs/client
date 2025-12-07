/* eslint-disable @next/next/no-img-element */
import { PATH } from '@/shared/constants/routes';
import { Popover, PopoverTrigger, Button, PopoverContent } from '@redotlabs/ui';
import { RedotUser } from '@repo/types';
import { LayoutDashboard } from 'lucide-react';
import React from 'react';
import SignOutButton from './sign-out-button';
import Link from 'next/link';
import { useDialog } from '@repo/hooks';

const HeaderAvatar = ({ user }: { user: RedotUser }) => {
  const { name, profileImageUrl, email } = user;
  const popover = useDialog();

  const getInitial = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <Popover open={popover.isOpen} onOpenChange={popover.onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="text" className="p-0 rounded-full h-fit">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="size-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitial(name)}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        {/* 프로필 정보 */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={name || 'User'}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="size-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitial(name)}
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        </div>

        {/* 메뉴 아이템 */}
        <div className="p-1">
          <Link href={PATH.dashboard.root} onClick={popover.onClose}>
            <Button
              variant="text"
              className="w-full p-0 h-fit flex justify-start items-center gap-3 px-4 py-2 text-sm text-gray-700"
              size="sm"
            >
              <LayoutDashboard size={16} />
              <span>대시보드</span>
            </Button>
          </Link>
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderAvatar;
