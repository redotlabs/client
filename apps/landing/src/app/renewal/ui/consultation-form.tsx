'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { RHFInput, RHFTextarea } from '@repo/ui';
import { Button } from '@redotlabs/ui';

const consultationSchema = z.object({
  websiteUrl: z.string().min(1),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(
      /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
      '올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)'
    ),
  message: z
    .string()
    .min(10, '상담 내용을 최소 10자 이상 입력해주세요')
    .max(1000, '상담 내용은 1000자를 초과할 수 없습니다'),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

interface ConsultationFormProps {
  websiteUrl: string;
  onBack: () => void;
}

export default function ConsultationForm({
  websiteUrl,
  onBack,
}: ConsultationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      websiteUrl,
      contact: '',
      message: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);

    // 실제로는 API 호출을 통해 상담 요청을 제출합니다
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('상담 요청 데이터:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            상담 요청이 완료되었습니다!
          </h2>
          <p className="text-gray-600">
            빠른 시일 내에 담당자가 연락드리겠습니다.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">다음 단계</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 text-left">
            <li>담당자가 영업일 기준 1-2일 내 연락드립니다</li>
            <li>상세한 요구사항 및 예산에 대해 논의합니다</li>
            <li>맞춤형 리뉴얼 제안서를 제공받습니다</li>
            <li>프로젝트 일정 및 계약을 진행합니다</li>
          </ol>
        </div>

        <button
          type="button"
          onClick={() => (window.location.href = '/')}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">상담 요청</h2>
        <p className="text-gray-600">
          리뉴얼 상담을 위한 정보를 입력해주세요. 담당자가 빠르게
          연락드리겠습니다.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 기존 홈페이지 주소 (읽기 전용) */}
          <div>
            <RHFInput name="websiteUrl" label="기존 홈페이지 주소" disabled />
            <p className="mt-1 text-xs text-gray-500">
              이전 단계에서 입력한 홈페이지 주소입니다
            </p>
          </div>

          {/* 연락처 */}
          <RHFInput
            name="contact"
            label="연락처 *"
            type="tel"
            placeholder="010-1234-5678"
          />

          {/* 상담 내용 */}
          <div>
            <RHFTextarea
              name="message"
              label="상담 내용 *"
              placeholder="리뉴얼하고 싶은 부분, 원하시는 기능, 예산, 일정 등을 자유롭게 작성해주세요."
              className="min-h-[160px]"
            />
            <p className="mt-1 text-xs text-gray-500">
              최소 10자 이상 입력해주세요 (최대 1000자)
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">
              개인정보 수집 및 이용 동의
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              입력하신 정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게
              폐기됩니다. 상담 요청 버튼을 클릭하시면 개인정보 수집 및 이용에
              동의하신 것으로 간주됩니다.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outlined"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1"
            >
              이전 단계
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  제출 중...
                </>
              ) : (
                '상담 요청하기'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
