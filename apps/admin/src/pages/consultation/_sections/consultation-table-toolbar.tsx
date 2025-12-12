import { queryKeyFactory } from '@/shared/api/query-key-factory';
import type { GetConsultationsParams } from '@/shared/api/services/consultation';
import { Button } from '@redotlabs/ui';
import type { ConsultationStatus, ConsultationType } from '@repo/types';
import { RHFDatePicker, RHFInput, RHFSelect } from '@repo/ui';
import { useQueryClient } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import type { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const STATUS_OPTIONS: { label: string; value: ConsultationStatus | '' }[] = [
  { label: '전체', value: '' },
  { label: '미처리', value: 'PENDING' },
  { label: '완료', value: 'COMPLETED' },
  { label: '취소', value: 'CANCELLED' },
];

const TYPE_OPTIONS: { label: string; value: ConsultationType | '' }[] = [
  { label: '전체', value: '' },
  { label: '신규', value: 'NEW' },
  { label: '리뉴얼', value: 'RENEWAL' },
];

interface ConsultationTableToolbarProps {
  setParams: Dispatch<SetStateAction<GetConsultationsParams>>;
  disabled: boolean;
}

type FormValues = Omit<GetConsultationsParams, 'startDate' | 'endDate'> & {
  startDate: Date;
  endDate: Date;
};

const ConsultationTableToolbar = ({
  setParams,
  disabled,
}: ConsultationTableToolbarProps) => {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: {
      status: '',
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
      type: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    let newParams;
    const { startDate, endDate, ...rest } = data;

    setParams((prev) => {
      newParams = {
        ...prev,
        ...rest,
        startDate: startDate && format(startDate, 'yyyy-MM-dd'),
        endDate: endDate && format(endDate, 'yyyy-MM-dd'),
      };
      return newParams;
    });

    queryClient.invalidateQueries({
      queryKey: queryKeyFactory.consultation.list(newParams),
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 py-4 flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-5">
          <RHFSelect
            name="status"
            placeholder="전체"
            label="상태"
            labelPlacement="left"
            options={STATUS_OPTIONS}
            size="sm"
          />
          <RHFSelect
            name="type"
            placeholder="전체"
            label="구분"
            labelPlacement="left"
            options={TYPE_OPTIONS}
            size="sm"
          />
          <RHFInput
            size="sm"
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            labelPlacement="left"
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-5">
            <div className="flex items-center">
              <RHFDatePicker
                size="sm"
                name="startDate"
                label="기간"
                placeholder="시작날짜를 선택해주세요."
                labelPlacement="left"
              />
              <span className="px-2 text-base font-bold">~</span>
              <RHFDatePicker
                size="sm"
                name="endDate"
                placeholder="종료날짜를 선택해주세요."
                labelPlacement="left"
              />
            </div>
            <RHFInput
              size="sm"
              name="phone"
              label="연락처"
              placeholder="연락처를 입력해주세요."
              labelPlacement="left"
            />
          </div>
          <Button type="submit" size="sm" disabled={disabled}>
            검색
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ConsultationTableToolbar;
