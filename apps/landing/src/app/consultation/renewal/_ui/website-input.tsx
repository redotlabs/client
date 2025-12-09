'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RHFInput } from '@repo/ui';
import { Button } from '@redotlabs/ui';

const websiteSchema = z.object({
  websiteUrl: z
    .string()
    .min(1, '홈페이지 주소를 입력해주세요')
    .url('올바른 URL 형식을 입력해주세요 (예: https://example.com)'),
});

type WebsiteFormData = z.infer<typeof websiteSchema>;

interface WebsiteInputProps {
  onSubmit: (url: string) => void;
}

export default function WebsiteInput({ onSubmit }: WebsiteInputProps) {
  const form = useForm<WebsiteFormData>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      websiteUrl: '',
    },
    mode: 'onChange',
  });

  const onFormSubmit = (data: WebsiteFormData) => {
    onSubmit(data.websiteUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          홈페이지 리뉴얼 상담
        </h2>
        <p className="text-gray-600">
          기존 홈페이지 주소를 입력하시면 리뉴얼 미리보기를 제공해드립니다.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <RHFInput
            name="websiteUrl"
            label="기존 홈페이지 주소 *"
            placeholder="https://example.com"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              리뉴얼 상담 프로세스
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>기존 홈페이지 주소 입력</li>
              <li>AI 기반 리뉴얼 미리보기 확인</li>
              <li>상담 요청서 작성 및 제출</li>
              <li>전문가 상담 진행</li>
            </ol>
          </div>

          <Button type="submit" className="w-full">
            다음 단계로
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

