import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, Badge } from '@redotlabs/ui';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@repo/ui';
import type { App } from '@/shared/types';
import AppTableHeader from './ui/app-table-header';
import AppTableRow from './ui/app-table-row';

// Mock 데이터 - 실제로는 API에서 가져옴
const MOCK_CUSTOMER = {
  id: 1,
  name: '김철수',
  email: 'kim@example.com',
  phone: '010-1234-5678',
  company: '테크컴퍼니',
  status: 'active' as const,
  createdAt: '2024-01-15T09:00:00.000Z',
  lastLoginAt: '2025-11-15T14:30:00.000Z',
  appCount: 5,
};

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

const CustomerDetailPage = () => {
  // const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 실제로는 useQuery 등을 사용하여 API에서 데이터를 가져옴
  const customer = MOCK_CUSTOMER;
  const apps = MOCK_APPS;

  return (
    <main className="p-10 container mx-auto flex-1">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="text"
          size="sm"
          onClick={() => navigate('/customer')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">고객 상세</h1>
          <p className="text-gray-500 mt-1">고객 정보 및 생성한 앱 목록</p>
        </div>
      </div>

      {/* 고객 정보 카드 */}
      <Card className="p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
            <p className="text-gray-500 mt-1">고객 ID: #{customer.id}</p>
          </div>
          <Badge
            size="md"
            color={customer.status === 'active' ? 'success' : 'default'}
          >
            {customer.status === 'active' ? '활성' : '비활성'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Mail size={16} />
              이메일
            </div>
            <p className="text-sm text-gray-800">{customer.email}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Phone size={16} />
              전화번호
            </div>
            <p className="text-sm text-gray-800">{customer.phone}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Building2 size={16} />
              회사
            </div>
            <p className="text-sm text-gray-800">{customer.company || '-'}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <User size={16} />앱 개수
            </div>
            <p className="text-sm font-semibold text-primary-600">
              {customer.appCount}개
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Calendar size={16} />
              가입일
            </div>
            <p className="text-sm text-gray-800">
              {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
          {customer.lastLoginAt && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Clock size={16} />
                마지막 로그인
              </div>
              <p className="text-sm text-gray-800">
                {format(new Date(customer.lastLoginAt), 'yyyy-MM-dd HH:mm')}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* 앱 목록 */}
      <div>
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
      </div>
    </main>
  );
};

export default CustomerDetailPage;
