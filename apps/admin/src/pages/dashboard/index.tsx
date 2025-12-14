import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@redotlabs/ui';
import { Users, Briefcase, UserRoundPen, TrendingUp } from 'lucide-react';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { PATH } from '@/shared/routes';

// 더미 데이터
const STATS = {
  totalCustomers: 127,
  totalConsultants: 45,
  totalAdmins: 8,
  todayNewCustomers: 5,
};

const RECENT_CONSULTANTS = [
  {
    id: 1,
    name: '김철수',
    phone: '010-1234-5678',
    isRenewal: true,
    consultContent:
      '현재 운영 중인 홈페이지가 오래되어 전면 리뉴얼을 원합니다.',
    status: 'UNPROCESSED' as const,
    createdAt: '2025-11-15T10:30:00.000Z',
  },
  {
    id: 2,
    name: '이영희',
    phone: '010-2345-6789',
    isRenewal: false,
    consultContent: '새로운 쇼핑몰 사이트를 제작하고 싶습니다.',
    status: 'UNPROCESSED' as const,
    createdAt: '2025-11-15T09:15:00.000Z',
  },
  {
    id: 3,
    name: '박민수',
    phone: '010-3456-7890',
    isRenewal: true,
    consultContent: '포트폴리오 사이트 리뉴얼 상담 원합니다.',
    status: 'PROGRESS' as const,
    createdAt: '2025-11-14T16:45:00.000Z',
  },
];

const RECENT_CUSTOMERS = [
  {
    id: 15,
    name: '정수진',
    email: 'jung@example.com',
    company: '테크스타트업',
    status: 'active' as const,
    createdAt: '2025-11-15T14:20:00.000Z',
  },
  {
    id: 14,
    name: '최동욱',
    email: 'choi@example.com',
    company: '디자인스튜디오',
    status: 'active' as const,
    createdAt: '2025-11-15T11:30:00.000Z',
  },
  {
    id: 13,
    name: '강민지',
    email: 'kang@example.com',
    company: null,
    status: 'active' as const,
    createdAt: '2025-11-14T15:10:00.000Z',
  },
];

const STATUS_CONFIG = {
  UNPROCESSED: { label: '미처리', color: 'default' as const },
  PROGRESS: { label: '진행중', color: 'info' as const },
  COMPLETED: { label: '완료', color: 'success' as const },
  CANCELLED: { label: '취소', color: 'danger' as const },
};

const DashboardPage = () => {
  return (
    <main className="p-10 container mx-auto flex-1">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <p className="text-gray-500 mt-1">전체 현황을 한눈에 확인하세요</p>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 고객</p>
              <p className="text-xl font-bold mt-1">{STATS.totalCustomers}</p>
            </div>
            <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">상담 요청</p>
              <p className="text-xl font-bold mt-1">{STATS.totalConsultants}</p>
            </div>
            <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
              <Briefcase className="text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">관리자</p>
              <p className="text-xl font-bold mt-1">{STATS.totalAdmins}</p>
            </div>
            <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center">
              <UserRoundPen className="text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">오늘 신규 가입</p>
              <p className="text-xl font-bold mt-1">
                {STATS.todayNewCustomers}
              </p>
            </div>
            <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* 최근 상담 요청 */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">최근 상담 요청</h2>
          <Link
            to={PATH.consultation.root}
            className="text-sm text-primary-500 hover:underline"
          >
            전체보기 →
          </Link>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>구분</TableHead>
              <TableHead>상담 내용</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>요청일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_CONSULTANTS.map((consultant) => {
              const statusConfig = STATUS_CONFIG[consultant.status];
              return (
                <TableRow key={consultant.id}>
                  <TableCell align="center">{consultant.name}</TableCell>
                  <TableCell align="center">{consultant.phone}</TableCell>
                  <TableCell align="center">
                    <Badge
                      size="sm"
                      color={consultant.isRenewal ? 'warning' : 'info'}
                      className="w-fit"
                    >
                      {consultant.isRenewal ? '리뉴얼' : '신규'}
                    </Badge>
                  </TableCell>
                  <TableCell align="center">
                    <p className="line-clamp-1">{consultant.consultContent}</p>
                  </TableCell>
                  <TableCell align="center">
                    <Badge
                      size="sm"
                      color={statusConfig.color}
                      className="w-fit"
                    >
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                  <TableCell align="center">
                    {format(new Date(consultant.createdAt), 'yyyy-MM-dd HH:mm')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* 최근 가입 고객 */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">최근 가입 고객</h2>
          <Link
            to={PATH.customer.root}
            className="text-sm text-primary-500 hover:underline"
          >
            전체보기 →
          </Link>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>회사</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_CUSTOMERS.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell align="center">{customer.id}</TableCell>
                <TableCell align="center">{customer.name}</TableCell>
                <TableCell align="center">{customer.email}</TableCell>
                <TableCell align="center">{customer.company || '-'}</TableCell>
                <TableCell align="center">
                  <Badge
                    size="sm"
                    color={customer.status === 'active' ? 'success' : 'default'}
                    className="w-fit"
                  >
                    {customer.status === 'active' ? '활성' : '비활성'}
                  </Badge>
                </TableCell>
                <TableCell align="center">
                  {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('border border-gray-200 rounded-lg p-6', className)}>
      {children}
    </div>
  );
};

export default DashboardPage;
