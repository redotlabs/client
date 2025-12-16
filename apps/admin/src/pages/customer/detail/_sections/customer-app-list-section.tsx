import { Table, TableBody } from '@redotlabs/ui';
import AppTableHeader from '../_ui/app-table-header';
import AppTableRow from '../_ui/app-table-row';
import type { App } from '@/shared/types';

const MOCK_APPS: App[] = [
  {
    id: 1,
    name: '쇼핑몰 앱',
    domain: 'shop.example.com',
    status: 'active',
    createdAt: '2024-02-01T10:00:00.000Z',
    lastDeployedAt: '2025-11-14T15:30:00.000Z',
  },
  {
    id: 2,
    name: '블로그 플랫폼',
    domain: 'blog.example.com',
    status: 'active',
    createdAt: '2024-03-15T14:20:00.000Z',
    lastDeployedAt: '2025-11-13T09:15:00.000Z',
  },
  {
    id: 3,
    name: '포트폴리오 사이트',
    domain: 'portfolio.example.com',
    status: 'active',
    createdAt: '2024-05-20T11:30:00.000Z',
    lastDeployedAt: '2025-11-10T16:45:00.000Z',
  },
  {
    id: 4,
    name: '랜딩 페이지',
    domain: 'landing.example.com',
    status: 'inactive',
    createdAt: '2024-07-10T09:00:00.000Z',
    lastDeployedAt: '2025-10-28T10:20:00.000Z',
  },
  {
    id: 5,
    name: 'CMS 대시보드',
    domain: 'cms.example.com',
    status: 'active',
    createdAt: '2024-08-25T16:00:00.000Z',
    lastDeployedAt: '2025-11-15T11:30:00.000Z',
  },
];

// ! Will be implemented
const CustomerAppListSection = ({ customerId: _ }: { customerId: number }) => {
  const apps = MOCK_APPS;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">생성한 앱 목록</h2>
        <p className="text-gray-500">총 {apps.length}개</p>
      </div>

      <Table className="w-full">
        <AppTableHeader />
        <TableBody>
          {apps.map((app, index) => (
            <AppTableRow key={app.id} app={app} order={index + 1} />
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CustomerAppListSection;
