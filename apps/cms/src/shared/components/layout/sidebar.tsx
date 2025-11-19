'use client';

import { Logo } from '@redotlabs/ui';
import { PATH } from '@/shared/constants/routes';
import {
  FilePen,
  MessageSquare,
  Monitor,
  Settings,
  SquareKanban,
  UserRoundPen,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@redotlabs/utils';
import { TenantLink, useTenantPathname } from '@repo/tenant-router/next';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  items?: {
    label: string;
    path: string;
  }[];
}

const SIDEBAR_ITEMS = [
  {
    icon: <SquareKanban size="20" />,
    label: '대시보드',
    path: PATH.dashboard,
  },
  {
    icon: <Monitor size="20" />,
    label: '사이트 관리',
    path: PATH.site.root,
    items: [
      {
        label: '사이트 관리',
        path: PATH.site.root,
      },
      {
        label: '콘텐츠 관리',
        path: PATH.site.content,
      },
      {
        label: '배너/광고 관리',
        path: PATH.site.banner,
      },
    ],
  },
  {
    icon: <MessageSquare size="20" />,
    label: '문의 관리',
    path: PATH.inquiry,
  },
  {
    icon: <UserRoundPen size="20" />,
    label: '사용자 관리',
    path: PATH.user,
  },
  {
    icon: <FilePen size="20" />,
    label: '게시글 관리',
    path: PATH.post,
  },
  {
    icon: <Settings size="20" />,
    label: '설정',
    path: PATH.setting.root,
    items: [
      {
        label: '일반 설정',
        path: PATH.setting.root,
      },
      {
        label: '플랜 및 결제',
        path: PATH.setting.plan,
      },
      // {
      //   label: '보안',
      //   path: PATH.setting.security,
      // },
      // {
      //   label: '팀 관리',
      //   path: PATH.setting.team,
      // },
    ],
  },
];

const SidebarItem = ({
  icon,
  label,
  path,
  isActive,
  items,
}: SidebarItemProps) => {
  const pathname = useTenantPathname();

  const isChildActive = (path: string) => {
    return pathname === path;
  };

  return (
    <li className="text-gray-400 ">
      <div
        className={cn(
          'p-3 rounded-lg font-semibold hover:bg-primary-100 hover:text-primary-500',
          isActive && 'bg-primary-100 text-primary-500'
        )}
      >
        <TenantLink href={path} className="flex items-center gap-2 ">
          {icon}
          {label}
        </TenantLink>
      </div>

      {items && (
        <ul className="mt-2 ml-7 pb-2 flex flex-col">
          {items.map((child) => (
            <li
              key={child.label}
              className={cn(
                'text-sm font-semibold hover:bg-primary-100 hover:text-primary-500 rounded-md',
                isChildActive(child.path) && 'bg-primary-100 text-primary-500'
              )}
            >
              <TenantLink href={child.path} className="block px-3 leading-8">
                {child.label}
              </TenantLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = () => {
  const pathname = useTenantPathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <aside className="flex-1 max-w-60 bg-white border-r border-gray-200 p-4">
      <div className="p-3 flex items-end gap-2 font-bold">
        <Logo.Text className="h-8" color="color" />
        CMS
      </div>

      <div className="mt-10">
        <ul className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              items={item?.items}
              isActive={isActive(item.path)}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
