'use client';

import { Textarea, type TextareaProps } from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@redotlabs/utils';

export interface RHFTextareaProps extends TextareaProps {
  name: string;
  label?: string;
  labelPlacement?: 'top' | 'left';
}

const RHFTextarea = ({
  name,
  label,
  labelPlacement = 'top',
  ...props
}: RHFTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <div>
            <div
              className={cn(
                labelPlacement === 'left' && 'flex items-center gap-4'
              )}
            >
              {label && (
                <label htmlFor={name} className="text-base font-bold">
                  {label}
                </label>
              )}
              <div className={cn(labelPlacement === 'top' && 'mt-2.5')}>
                <Textarea id={name} {...field} {...props} />
              </div>
            </div>
            {fieldState.error && (
              <p className="mt-1 text-sm font-semibold text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default RHFTextarea;
