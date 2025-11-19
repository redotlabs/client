'use client';

import { Button } from '@redotlabs/ui';
import { RHFDatePicker, RHFInput, RHFSelect } from '@repo/ui';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { subDays } from 'date-fns';

const defaultValues = {
  status: '',
  inquiryNumber: '',
  startDate: subDays(new Date(), 30),
  endDate: new Date(),
  inquirerName: '',
};
const InquiryTableToolbar = () => {
  const form = useForm({
    defaultValues,
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="py-4 flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-5">
          <RHFSelect
            size="sm"
            name="status"
            label="상태"
            placeholder="전체"
            labelPlacement="left"
            options={[
              { label: '전체', value: '' },
              { label: '미처리', value: 'UNPROCESSED' },
              { label: '처리중', value: 'PROGRESS' },
              { label: '완료', value: 'COMPLETED' },
            ]}
          />
          <RHFInput
            size="sm"
            name="inquiryNumber"
            label="문의번호"
            placeholder="문의번호를 입력해주세요."
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
              name="inquirerName"
              label="문의자"
              placeholder="문의자를 입력해주세요."
              labelPlacement="left"
            />
          </div>
          <Button type="submit" size="sm">
            검색
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default InquiryTableToolbar;
