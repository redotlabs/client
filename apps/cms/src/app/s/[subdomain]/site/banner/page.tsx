'use client';

import { Badge, Button, Checkbox } from '@redotlabs/ui';
import {
  Plus,
  Image as ImageIcon,
  Edit,
  Trash2,
  Calendar,
  Eye,
  MousePointerClick,
} from 'lucide-react';
import { cn } from '@redotlabs/utils';
import { Card, RHFSelect } from '@repo/ui';
import { FormProvider, useForm } from 'react-hook-form';

const BANNERS = [
  {
    id: 1,
    title: '신규 서비스 출시 이벤트',
    description: '지금 가입하면 첫 달 50% 할인',
    imageUrl: '',
    linkUrl: 'https://example.com/event',
    position: 'main',
    isActive: true,
    clicks: 1234,
    views: 5678,
    startDate: '2025-11-01',
    endDate: '2025-11-30',
  },
  {
    id: 2,
    title: '블랙 프라이데이 특가',
    description: '최대 70% 할인 혜택',
    imageUrl: '',
    linkUrl: 'https://example.com/blackfriday',
    position: 'sidebar',
    isActive: true,
    clicks: 856,
    views: 3421,
    startDate: '2025-11-15',
    endDate: '2025-11-25',
  },
  {
    id: 3,
    title: '연말 감사 이벤트',
    description: '고객님께 감사의 마음을 전합니다',
    imageUrl: '',
    linkUrl: 'https://example.com/thanks',
    position: 'main',
    isActive: false,
    clicks: 0,
    views: 0,
    startDate: '2025-12-01',
    endDate: '2025-12-31',
  },
  {
    id: 4,
    title: '무료 체험 프로그램',
    description: '14일 무료 체험 가능',
    imageUrl: '',
    linkUrl: 'https://example.com/trial',
    position: 'popup',
    isActive: true,
    clicks: 423,
    views: 2156,
    startDate: '2025-11-10',
    endDate: '2025-12-10',
  },
] as const;

const POSITION_LABELS = {
  main: '메인 배너',
  sidebar: '사이드바',
  popup: '팝업',
  footer: '푸터',
};

const SiteBannerPage = () => {
  const form = useForm({
    defaultValues: {
      position: 'all',
    },
  });

  const selectedPosition = form.watch('position');

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const filteredBanners = BANNERS.filter((banner) => {
    return selectedPosition === 'all' || banner.position === selectedPosition;
  });

  const activeBanners = BANNERS.filter((b) => b.isActive).length;
  const totalClicks = BANNERS.reduce((sum, b) => sum + b.clicks, 0);
  const totalViews = BANNERS.reduce((sum, b) => sum + b.views, 0);
  const avgCTR =
    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">배너/광고 관리</h1>
          <p className="text-gray-500 mt-1">총 {BANNERS.length}개의 배너</p>
        </div>
        <Button
          variant="contained"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          배너 추가
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">활성 배너</p>
              <p className="text-2xl font-bold mt-1">{activeBanners}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ImageIcon className="text-green-500" size={24} />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 조회수</p>
              <p className="text-2xl font-bold mt-1">
                {totalViews.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Eye className="text-blue-500" size={24} />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 클릭수</p>
              <p className="text-2xl font-bold mt-1">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <MousePointerClick className="text-purple-500" size={24} />
            </div>
          </div>
        </Card>

        <Card className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">평균 CTR</p>
              <p className="text-2xl font-bold mt-1">{avgCTR}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <MousePointerClick className="text-orange-500" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* 필터 */}
      <div className="mt-8">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <RHFSelect
                name="position"
                label="위치"
                size="sm"
                placeholder="모든 위치"
                labelPlacement="left"
                options={[
                  { label: '모든 위치', value: 'all' },
                  { label: '메인 배너', value: 'main' },
                  { label: '사이드바', value: 'sidebar' },
                  { label: '팝업', value: 'popup' },
                  { label: '푸터', value: 'footer' },
                ]}
              />
            </div>
            <Button type="submit" size="sm">
              검색
            </Button>
          </form>
        </FormProvider>
      </div>

      {/* 배너 목록 */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {filteredBanners.map((banner) => {
          const ctr =
            banner.views > 0
              ? ((banner.clicks / banner.views) * 100).toFixed(2)
              : 0;

          return (
            <Card key={banner.id}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* 배너 이미지 */}
                <div className="w-full md:w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>

                {/* 배너 정보 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {banner.title}
                        </h3>
                        <Badge
                          className={cn(
                            banner.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          )}
                        >
                          {banner.isActive ? '활성' : '비활성'}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700">
                          {POSITION_LABELS[banner.position]}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{banner.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        링크: {banner.linkUrl}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={banner.isActive}
                        onChange={(e) => {
                          console.log(e.target.checked);
                        }}
                      />
                    </div>
                  </div>

                  {/* 통계 */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        조회: {banner.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MousePointerClick size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        클릭: {banner.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">CTR: {ctr}%</span>
                    </div>
                  </div>

                  {/* 기간 */}
                  <div className="flex items-center gap-2 mt-4">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {banner.startDate} ~ {banner.endDate}
                    </span>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="outlined"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit size={16} />
                      수정
                    </Button>
                    <Button
                      variant="outlined"
                      size="sm"
                      className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredBanners.length === 0 && (
        <Card className="mt-8">
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">배너가 없습니다</p>
            <Button
              variant="outlined"
              className="mt-4 flex items-center gap-2 mx-auto"
            >
              <Plus size={16} />첫 배너 추가하기
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
};

export default SiteBannerPage;
