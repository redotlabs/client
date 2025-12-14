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
] as const;

const SidebarItem = ({ icon, label, path, isActive }: SidebarItemProps) => {
  return (
    <li
      className={cn(
        'p-3 rounded-lg text-gray-400 font-semibold hover:bg-primary-100 hover:text-primary-500',
        isActive && 'bg-primary-100 text-primary-500'
      )}
    >
      <Link to={path} className="flex items-center gap-2 ">
        {icon}
        {label}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
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
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
