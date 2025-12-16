import { Logo } from '@redotlabs/ui';
import { Link, useLocation } from 'react-router-dom';
import { PATH } from '@/shared/routes';
import {
  SquareKanban,
  UserRoundPen,
  Users,
  Briefcase,
  Receipt,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@redotlabs/utils';

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
    icon: <UserRoundPen size="20" />,
    label: '관리자 관리',
    path: PATH.admin.root,
  },
  {
    icon: <Users size="20" />,
    label: '고객 관리',
    path: PATH.customer.root,
    items: [
      {
        label: '고객 관리',
        path: PATH.customer.root,
      },
      {
        label: '앱 관리',
        path: PATH.customer.app,
      },
    ],
  },
  {
    icon: <Briefcase size="20" />,
    label: '상담 요청 관리',
    path: PATH.consultation.root,
  },
  {
    icon: <Receipt size="20" />,
    label: '매입/매출 관리',
    path: PATH.transaction.root,
  },
];

const SidebarItem = ({
  icon,
  label,
  path,
  isActive,
  items,
}: SidebarItemProps) => {
  const { pathname } = useLocation();

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
        <Link to={path} className="flex items-center gap-2 ">
          {icon}
          {label}
        </Link>
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
              <Link to={child.path} className="block px-3 leading-8">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path !== PATH.root) {
      return pathname.includes(path);
    }
    return pathname === path;
  };

  return (
    <aside className="flex-1 max-w-60 bg-white border-r border-gray-200 p-4">
      <div className="p-3 flex items-center gap-2">
        <Logo.Symbol className="size-8" variant="base" />
        Admin
      </div>

      <div className="mt-10">
        <ul className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              items={item?.items}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
