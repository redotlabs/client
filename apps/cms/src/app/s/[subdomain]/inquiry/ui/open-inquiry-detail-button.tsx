'use client';

import {
  Card,
  RHFTextarea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui';
import { Button } from '@redotlabs/ui';
import type { Inquiry } from '@/shared/types';
import { format } from 'date-fns';
import { User, Calendar, Phone, Mail, Trash2, Check } from 'lucide-react';
import InquiryStatusBadge from './inquiry-status-badge';
import { FormProvider, useForm } from 'react-hook-form';

interface OpenInquiryDetailButtonProps {
  inquiry: Inquiry & {
    phone?: string;
    email?: string;
  };
  children: React.ReactNode;
}

const STATUS_LABELS: Record<string, string> = {
  UNPROCESSED: '미처리',
  PROGRESS: '진행중',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

const OpenInquiryDetailButton = ({
  inquiry,
  children,
}: OpenInquiryDetailButtonProps) => {
  const form = useForm({
    defaultValues: {
      answer: '',
    },
  });

  const onSubmit = (data: { answer: string }) => {
    console.log('처리 완료:', inquiry.id, data.answer);
    // TODO: API 호출
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      console.log('삭제:', inquiry.id);
      // TODO: API 호출
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetContent className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg overflow-y-auto">
            <SheetHeader className="p-0">
              <SheetTitle className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-primary-500">
                  {inquiry.inquiryNumber}
                </h2>
                <InquiryStatusBadge status={inquiry.status} />
              </SheetTitle>
              <p className="text-3xl font-bold text-gray-800">
                {inquiry.title}
              </p>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* 작성자 정보 */}
              <div className="flex gap-2">
                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <User size={16} />
                    작성자
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {inquiry.inquirerName}
                  </p>
                </Card>

                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Calendar size={16} />
                    문의일시
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {format(new Date(inquiry.createdAt), 'yyyy-MM-dd HH:mm')}
                  </p>
                </Card>

                {inquiry.phone && (
                  <Card className="px-2.5 py-1.5 bg-white flex-1">
                    <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Phone size={16} />
                      연락처
                    </label>
                    <p className="mt-2 text-sm text-gray-800">
                      {inquiry.phone}
                    </p>
                  </Card>
                )}

                {inquiry.email && (
                  <Card className="px-2.5 py-1.5 bg-white flex-1">
                    <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Mail size={16} />
                      이메일
                    </label>
                    <p className="mt-2 text-sm text-gray-800">
                      {inquiry.email}
                    </p>
                  </Card>
                )}
              </div>

              {/* 문의내용 */}
              <div>
                <label className="text-base font-bold">문의내용</label>
                <div className="mt-2.5 bg-white border border-gray-200 rounded-lg p-4 min-h-[120px]">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {inquiry.content}
                  </p>
                </div>
              </div>

              {/* 답변 */}
              <div>
                <RHFTextarea
                  name="answer"
                  label="답변"
                  placeholder="답변을 입력해주세요..."
                  className="min-h-[160px] bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  답변을 입력하고 {'처리완료'} 버튼을 클릭하면 문의가 완료
                  처리됩니다.
                </p>
              </div>

              {/* 상태 변경 안내 */}
              {inquiry.status !== 'COMPLETED' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1 text-sm text-blue-700">
                      <p className="font-medium mb-1">처리 상태</p>
                      <p className="text-blue-600">
                        현재 상태: {STATUS_LABELS[inquiry.status]}
                        <br />
                        처리완료 버튼을 클릭하면 문의 상태가 {'완료'}로 변경되고
                        고객에게 답변이 발송됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                size="sm"
                color="danger"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                삭제
              </Button>
              <Button
                variant="contained"
                size="sm"
                disabled={
                  inquiry.status === 'COMPLETED' || !form.formState.isValid
                }
                className="flex items-center gap-2"
                type="submit"
              >
                <Check size={16} />
                처리완료
              </Button>
            </div>
          </SheetContent>
        </form>
      </FormProvider>
    </Sheet>
  );
};

export default OpenInquiryDetailButton;
