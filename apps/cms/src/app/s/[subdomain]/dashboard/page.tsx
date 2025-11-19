'use client';

import { Badge, Button } from '@redotlabs/ui';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  MessageSquare,
  Eye,
  ArrowRight,
  Plus,
  Calendar,
} from 'lucide-react';
import { cn } from '@redotlabs/utils';
import { TenantLink } from '@repo/tenant-router/next';
import { PATH } from '@/shared/constants/routes';

const STATS = [
  {
    label: '총 방문자',
    value: '12,543',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    label: '페이지뷰',
    value: '45,678',
    change: '+8.2%',
    trend: 'up',
    icon: Eye,
    color: 'green',
  },
  {
    label: '게시글',
    value: '156',
    change: '+3',
    trend: 'up',
    icon: FileText,
    color: 'purple',
  },
  {
    label: '미처리 문의',
    value: '23',
    change: '-5',
    trend: 'down',
    icon: MessageSquare,
    color: 'orange',
  },
];

const RECENT_POSTS = [
  {
    id: 1,
    title: '2024년 웹 디자인 트렌드',
    status: 'published',
    views: 1234,
    date: '2025-11-14',
  },
  {
    id: 2,
    title: 'React 19 새로운 기능 소개',
    status: 'published',
    views: 856,
    date: '2025-11-13',
  },
  {
    id: 3,
    title: 'SEO 최적화 가이드',
    status: 'draft',
    views: 0,
    date: '2025-11-12',
  },
  {
    id: 4,
    title: 'Next.js 성능 최적화 팁',
    status: 'published',
    views: 2341,
    date: '2025-11-11',
  },
];

const RECENT_INQUIRIES = [
  {
    id: 1,
    inquirer: '김철수',
    title: '제품 문의드립니다',
    status: 'UNPROCESSED',
    date: '2025-11-15 10:30',
  },
  {
    id: 2,
    inquirer: '이영희',
    title: '서비스 가격 문의',
    status: 'PROGRESS',
    date: '2025-11-15 09:15',
  },
  {
    id: 3,
    inquirer: '박민수',
    title: '기술 지원 요청',
    status: 'COMPLETED',
    date: '2025-11-14 16:45',
  },
];

const TRAFFIC_DATA = [
  { day: '월', views: 3200 },
  { day: '화', views: 4100 },
  { day: '수', views: 3800 },
  { day: '목', views: 5200 },
  { day: '금', views: 6100 },
  { day: '토', views: 4500 },
  { day: '일', views: 3900 },
];

export default function DashboardPage() {
  const maxViews = Math.max(...TRAFFIC_DATA.map((d) => d.views));

  return (
    <main className="p-10 container mx-auto flex-1">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">대시보드</h1>
          <p className="text-gray-500 mt-1">전체 현황을 한눈에 확인하세요</p>
        </div>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
          >
            <Calendar size={16} />
            이번 주
          </Button>
          <TenantLink href={PATH.post}>
            <Button
              size="sm"
              variant="contained"
              className="flex items-center gap-2"
            >
              <Plus size={16} />새 게시글
            </Button>
          </TenantLink>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';

          return (
            <Card key={stat.label} className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {isPositive ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isPositive ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">vs 지난주</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    stat.color === 'blue' && 'bg-blue-100',
                    stat.color === 'green' && 'bg-green-100',
                    stat.color === 'purple' && 'bg-purple-100',
                    stat.color === 'orange' && 'bg-orange-100'
                  )}
                >
                  <Icon
                    size={24}
                    className={cn(
                      stat.color === 'blue' && 'text-blue-500',
                      stat.color === 'green' && 'text-green-500',
                      stat.color === 'purple' && 'text-purple-500',
                      stat.color === 'orange' && 'text-orange-500'
                    )}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* 트래픽 차트 */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">주간 트래픽</h2>
            <TenantLink href={PATH.dashboard}>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1"
              >
                상세보기
                <ArrowRight size={16} />
              </Button>
            </TenantLink>
          </div>

          <div className="flex items-end justify-between gap-4 h-64">
            {TRAFFIC_DATA.map((data) => {
              const height = (data.views / maxViews) * 100;

              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="relative w-full flex items-end h-48">
                    <div
                      className="w-full bg-primary-500 rounded-t-lg hover:bg-primary-600 transition-all cursor-pointer group relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.views.toLocaleString()}회
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 빠른 액션 */}
        <Card>
          <h2 className="text-lg font-semibold mb-6">빠른 작업</h2>
          <div className="flex flex-col gap-3">
            <TenantLink href={PATH.post}>
              <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="text-blue-500" size={20} />
                  </div>
                  <span className="font-medium">새 게시글 작성</span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                />
              </button>
            </TenantLink>

            <TenantLink href={PATH.inquiry}>
              <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="text-orange-500" size={20} />
                  </div>
                  <span className="font-medium">문의 확인</span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                />
              </button>
            </TenantLink>

            <TenantLink href={PATH.user}>
              <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="text-purple-500" size={20} />
                  </div>
                  <span className="font-medium">사용자 관리</span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                />
              </button>
            </TenantLink>

            <TenantLink href={PATH.site.root}>
              <button className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="text-green-500" size={20} />
                  </div>
                  <span className="font-medium">사이트 설정</span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                />
              </button>
            </TenantLink>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* 최근 게시글 */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">최근 게시글</h2>
            <TenantLink href={PATH.post}>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1"
              >
                전체보기
                <ArrowRight size={16} />
              </Button>
            </TenantLink>
          </div>

          <div className="space-y-4">
            {RECENT_POSTS.map((post) => (
              <div
                key={post.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{post.title}</h3>
                      <Badge
                        className={cn(
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {post.status === 'published' ? '게시됨' : '초안'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {post.views.toLocaleString()}
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 최근 문의 */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">최근 문의</h2>
            <TenantLink href={PATH.inquiry}>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1"
              >
                전체보기
                <ArrowRight size={16} />
              </Button>
            </TenantLink>
          </div>

          <div className="space-y-4">
            {RECENT_INQUIRIES.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{inquiry.title}</h3>
                      <Badge
                        className={cn(
                          inquiry.status === 'UNPROCESSED' &&
                            'bg-red-100 text-red-700',
                          inquiry.status === 'PROGRESS' &&
                            'bg-blue-100 text-blue-700',
                          inquiry.status === 'COMPLETED' &&
                            'bg-green-100 text-green-700'
                        )}
                      >
                        {inquiry.status === 'UNPROCESSED' && '미처리'}
                        {inquiry.status === 'PROGRESS' && '처리중'}
                        {inquiry.status === 'COMPLETED' && '완료'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{inquiry.inquirer}</span>
                      <span>{inquiry.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

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
