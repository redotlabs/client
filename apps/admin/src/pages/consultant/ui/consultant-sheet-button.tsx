'use client';

import type { Consultant } from '@/shared/types';
import { Badge, Button, toast } from '@redotlabs/ui';
import {
  Card,
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  RHFTextarea,
  RHFSelect,
} from '@repo/ui';
import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { User, Phone, Mail, Calendar, Globe, Trash2, Check } from 'lucide-react';

interface ConsultantSheetButtonProps extends PropsWithChildren {
  consultant: Consultant;
}

const STATUS_LABELS: Record<string, string> = {
  UNPROCESSED: '미처리',
  PROGRESS: '진행중',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

const STATUS_CONFIG = {
  UNPROCESSED: { label: '미처리', color: 'default' as const },
  PROGRESS: { label: '진행중', color: 'info' as const },
  COMPLETED: { label: '완료', color: 'success' as const },
  CANCELLED: { label: '취소', color: 'danger' as const },
};

const ConsultantSheetButton = ({
  consultant,
  children,
}: ConsultantSheetButtonProps) => {
  const form = useForm({
    defaultValues: {
      answer: '',
      status: consultant.status,
    },
  });

  const onSubmit = (data: { answer: string; status: string }) => {
    console.log('상담 처리:', { ...data, id: consultant.id });
    toast.success('상담이 처리되었습니다.');
    // TODO: API 호출
  };

  const onDelete = () => {
    const ok = confirm('상담 요청을 삭제하시겠습니까?');
    if (!ok) return;
    console.log('상담 삭제:', consultant.id);
    toast.success('상담 요청이 삭제되었습니다.');
    // TODO: API 호출
  };

  const statusConfig = STATUS_CONFIG[consultant.status];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetContent
            side="right"
            className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg overflow-y-auto"
            aria-describedby={undefined}
          >
            <SheetHeader className="p-0">
              <SheetTitle className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-primary-500">
                  상담 요청 #{consultant.id}
                </h2>
                <Badge size="sm" color={statusConfig.color}>
                  {statusConfig.label}
                </Badge>
              </SheetTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  size="sm"
                  color={consultant.isRenewal ? 'warning' : 'info'}
                >
                  {consultant.isRenewal ? '리뉴얼' : '신규'}
                </Badge>
              </div>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* 고객 정보 */}
              <div className="flex gap-2">
                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <User size={16} />
                    이름
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {consultant.name}
                  </p>
                </Card>

                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Phone size={16} />
                    연락처
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {consultant.phone}
                  </p>
                </Card>

                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Mail size={16} />
                    이메일
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {consultant.email}
                  </p>
                </Card>
              </div>

              <div className="flex gap-2">
                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Calendar size={16} />
                    요청일시
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {format(new Date(consultant.createdAt), 'yyyy-MM-dd HH:mm')}
                  </p>
                </Card>

                {consultant.isRenewal && consultant.currentWebsiteUrl && (
                  <Card className="px-2.5 py-1.5 bg-white flex-1">
                    <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Globe size={16} />
                      기존 홈페이지
                    </label>
                    <a
                      href={consultant.currentWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-primary-500 hover:underline break-all"
                    >
                      {consultant.currentWebsiteUrl}
                    </a>
                  </Card>
                )}
              </div>

              {/* 상담 내용 */}
              <div>
                <label className="text-base font-bold">상담 내용</label>
                <div className="mt-2.5 bg-white border border-gray-200 rounded-lg p-4 min-h-[120px]">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {consultant.consultContent}
                  </p>
                </div>
              </div>

              {/* 상태 변경 */}
              <div>
                <RHFSelect
                  name="status"
                  label="처리 상태"
                  options={[
                    { label: '미처리', value: 'UNPROCESSED' },
                    { label: '진행중', value: 'PROGRESS' },
                    { label: '완료', value: 'COMPLETED' },
                    { label: '취소', value: 'CANCELLED' },
                  ]}
                />
              </div>

              {/* 답변 */}
              <div>
                <RHFTextarea
                  name="answer"
                  label="답변"
                  placeholder="고객에게 보낼 답변을 입력해주세요..."
                  className="min-h-[160px] bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  답변을 입력하고 {'처리완료'} 버튼을 클릭하면 고객에게 이메일로
                  답변이 발송됩니다.
                </p>
              </div>

              {/* 안내 메시지 */}
              {consultant.status !== 'COMPLETED' && (
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
                      <p className="font-medium mb-1">처리 안내</p>
                      <p className="text-blue-600">
                        현재 상태: {STATUS_LABELS[consultant.status]}
                        <br />
                        상태를 {'완료'}로 변경하고 답변을 작성하면 고객에게
                        이메일이 발송됩니다.
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
                onClick={onDelete}
                className="flex items-center gap-2"
                type="button"
              >
                <Trash2 size={16} />
                삭제
              </Button>
              <Button
                variant="contained"
                size="sm"
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

export default ConsultantSheetButton;

