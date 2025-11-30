'use client';

import { Button, Badge, toast } from '@redotlabs/ui';
import { Loader, RHFInput } from '@repo/ui';
import { Check, Sparkles } from 'lucide-react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { cn } from '@redotlabs/utils';
import { useCreateApp } from '@/shared/api/queries/app';
import { colors } from '@redotlabs/tokens';
import { PATH } from '@/shared/constants/routes';

interface CreateAppFormProps {
  isFirstApp?: boolean;
}

// 앱 생성 비용 (일회성)
const APP_CREATION_PRICE = 99000;

// 테마 옵션
const THEMES = [
  {
    id: 'DEFAULT' as const,
    name: 'Default',
    description: '깔끔하고 심플한 기본 테마',
  },
  {
    id: 'MODERN' as const,
    name: 'Modern',
    description: '세련되고 현대적인 디자인',
  },
];

// 색상 옵션
const COLORS = Object.entries(colors)
  .filter(([key]) => key !== 'white' && key !== 'black')
  .map(([key, value]: [string, { [key: string]: string }]) => ({
    id: key,
    name: key,
    hex: value?.['500'],
  }));

// 폰트 옵션
const FONTS = [
  {
    id: 'pretendard' as const,
    name: 'Pretendard',
    description: '한글 최적화 폰트',
  },
];

const schema = z.object({
  appName: z.string().min(1, '앱 이름을 입력해주세요.'),
  theme: z.enum(['DEFAULT', 'MODERN']),
  color: z.string().min(1, '색상을 선택해주세요.'),
  font: z.literal('pretendard'),
});

export default function CreateAppForm({
  isFirstApp = false,
}: CreateAppFormProps) {
  const router = useRouter();
  const createMutation = useCreateApp();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      appName: '',
      theme: 'DEFAULT',
      color: 'blue',
      font: 'pretendard',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // 첫 앱이면 바로 생성
    if (isFirstApp) {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.push(PATH.dashboard.root + '?created=success');
        },
        onError: (error) => {
          toast.error(error?.message || '앱 생성에 실패했습니다.');
        },
      });
    } else {
      // 추가 앱은 결제 페이지로 이동
      const params = new URLSearchParams({
        serviceName: data.appName,
        theme: data.theme,
        color: data.color,
        font: data.font,
      });
      router.push(PATH.dashboard.payment + '?' + params.toString());
    }
  };

  const disabled = !form.formState.isValid || createMutation.isPending;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 무료 앱 생성 안내 */}
        {isFirstApp && (
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  🎉 첫 앱은 무료로 만들 수 있어요!
                </h3>
                <p className="text-primary-700">
                  첫 번째 앱은 생성 비용 없이 바로 시작할 수 있습니다. 앱을 만든
                  후 필요에 따라 플랜을 업그레이드하세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isFirstApp && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                  추가 앱 생성
                </h3>
                <p className="text-blue-700 mb-3">
                  추가 앱을 생성하려면 생성 비용이 필요합니다. 생성 후 각 앱마다
                  무료 플랜으로 시작하거나 유료 플랜을 구독할 수 있습니다.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-900">
                    ₩{APP_CREATION_PRICE.toLocaleString()}
                  </span>
                  <span className="text-sm text-blue-600">일회성 결제</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 앱 정보 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">앱 정보</h2>
          <RHFInput name="appName" label="앱 이름" placeholder="내 블로그" />
        </div>

        {/* 테마 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">테마</h2>
          <Controller
            name="theme"
            control={form.control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-4">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => field.onChange(theme.id)}
                    className={cn(
                      'relative p-4 border-2 rounded-lg text-left transition-all hover:border-primary-300',
                      field.value === theme.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white'
                    )}
                  >
                    {field.value === theme.id && (
                      <div className="absolute top-2 right-2">
                        <Check size={20} className="text-primary-500" />
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 mb-1">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        {/* 색상 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">메인 색상</h2>
          <Controller
            name="color"
            control={form.control}
            render={({ field }) => (
              <div className="grid grid-cols-4 gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => field.onChange(color.id)}
                    className={cn(
                      'relative p-3 border-2 rounded-lg text-center transition-all hover:scale-105',
                      field.value === color.id
                        ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                        : 'border-gray-200'
                    )}
                  >
                    <div
                      className="w-full h-12 rounded-md mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-xs font-medium text-gray-900">
                      {color.name}
                    </p>
                    {field.value === color.id && (
                      <div className="absolute -top-2 -right-2 bg-gray-900 rounded-full p-1">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          />
        </div>

        {/* 폰트 선택 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">폰트</h2>
          <Controller
            name="font"
            control={form.control}
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-4">
                {FONTS.map((font) => (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => field.onChange(font.id)}
                    disabled
                    className={cn(
                      'relative p-4 border-2 rounded-lg text-left',
                      'border-primary-500 bg-primary-50 cursor-default'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          {font.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {font.description}
                        </p>
                      </div>
                      <Badge size="sm" color="info">
                        기본 폰트
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}
          />
          <p className="text-xs text-gray-500">
            * 현재는 Pretendard 폰트만 지원됩니다. 추가 폰트는 추후 업데이트
            예정입니다.
          </p>
        </div>

        {/* 요약 */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">생성 요약</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">앱 개수</span>
              <span className="font-semibold text-gray-900">1개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">초기 플랜</span>
              <span className="font-semibold text-gray-900">Free (무료)</span>
            </div>
            <div className="border-t border-gray-300 my-2" />
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-900">생성 비용</span>
              <span className="font-bold text-primary-600">
                {isFirstApp
                  ? '무료'
                  : `₩${APP_CREATION_PRICE.toLocaleString()}`}
              </span>
            </div>
            {!isFirstApp && (
              <div className="bg-white rounded-lg p-3 mt-3">
                <p className="text-xs text-gray-600">
                  <strong>결제 안내:</strong> 앱 생성 비용은 일회성 결제입니다.
                  생성 후 각 앱마다 별도로 플랜을 구독할 수 있습니다.
                </p>
              </div>
            )}
            {isFirstApp && (
              <div className="bg-green-50 rounded-lg p-3 mt-3 border border-green-200">
                <p className="text-xs text-green-700">
                  <strong>🎉 축하합니다!</strong> 첫 앱을 무료로 생성할 수
                  있습니다. 앱 생성 후 대시보드에서 플랜을 관리하세요.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outlined"
            onClick={() => router.back()}
            type="button"
          >
            취소
          </Button>
          <Button type="submit" disabled={disabled}>
            {createMutation.isPending ? (
              <Loader />
            ) : isFirstApp ? (
              '무료로 앱 만들기'
            ) : (
              '결제하고 만들기'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
