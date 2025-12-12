import type { Consultation } from '@repo/types';
import {
  Card,
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  RHFTextarea,
} from '@repo/ui';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Mail, Globe, Phone, Calendar } from 'lucide-react';
import ConsultationStatusBadge from './consultation-status-badge';
import ConsultationTypeBadge from './consultation-type-badge';
import ConsultationCompleteButton from './complete-button';
import ConsultationCompleteCancelButton from './complete-cancel-button';
import ConsultationCancelButton from './cancel-button';

interface ConsultantSheetProps {
  consultation: Consultation;
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ConsultantSheet = ({
  consultation,
  trigger,
  isOpen,
  onOpenChange,
}: ConsultantSheetProps) => {
  const {
    id,
    type,
    email,
    phone,
    status = 'PENDING',
    content,
    createdAt,
    currentWebsiteUrl,
  } = consultation;

  const form = useForm({
    defaultValues: {
      remark: consultation.remark || '',
    },
  });

  const isCompleted = status === 'COMPLETED';
  const isCancelled = status === 'CANCELLED';
  const isReadOnly = isCompleted || isCancelled;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <SheetContent
            side="right"
            className="p-15 min-w-[50vw] border-none bg-gray-100 shadow-lg overflow-y-auto"
            aria-describedby={undefined}
          >
            <SheetHeader className="p-0">
              <SheetTitle className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-500">
                  상담 요청 #{id}
                </span>
                <ConsultationTypeBadge type={type} />
                <ConsultationStatusBadge status={status!} />
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* 고객 정보 */}
              <div className="flex gap-2">
                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Phone size={16} />
                    연락처
                  </label>
                  <p className="mt-2 text-sm text-gray-800">{phone}</p>
                </Card>

                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Mail size={16} />
                    이메일
                  </label>
                  <p className="mt-2 text-sm text-gray-800">{email}</p>
                </Card>
                <Card className="px-2.5 py-1.5 bg-white flex-1">
                  <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Calendar size={16} />
                    요청일시
                  </label>
                  <p className="mt-2 text-sm text-gray-800">
                    {format(new Date(createdAt), 'yyyy-MM-dd HH:mm')}
                  </p>
                </Card>
              </div>

              <div className="flex gap-2">
                {type === 'RENEWAL' && currentWebsiteUrl && (
                  <Card className="px-2.5 py-1.5 bg-white flex-1">
                    <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Globe size={16} />
                      기존 홈페이지
                    </label>
                    <a
                      href={currentWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-primary-500 hover:underline break-all"
                    >
                      {currentWebsiteUrl}
                    </a>
                  </Card>
                )}
              </div>

              {/* 상담 내용 */}
              <div>
                <label className="text-base font-bold">상담 내용</label>
                <div className="mt-2.5 bg-white border border-gray-200 rounded-lg p-4 min-h-[120px]">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {content}
                  </p>
                </div>
              </div>

              {/* 답변 */}
              <div>
                <RHFTextarea
                  name="remark"
                  label="비고"
                  placeholder="고객에게 보낼 답변을 입력해주세요..."
                  className="min-h-[160px] bg-white"
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {!isCancelled && (
              <div className="flex justify-end gap-2">
                <ConsultationCancelButton consultation={consultation} />
                {isCompleted ? (
                  <ConsultationCompleteCancelButton
                    consultation={consultation}
                  />
                ) : (
                  <ConsultationCompleteButton consultation={consultation} />
                )}
              </div>
            )}
          </SheetContent>
        </form>
      </FormProvider>
    </Sheet>
  );
};

export default ConsultantSheet;
