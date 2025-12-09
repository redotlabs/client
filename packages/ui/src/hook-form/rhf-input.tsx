'use client';

import { Input, type InputProps } from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';
import PasswordInput from '../password-input';
import { cn } from '@redotlabs/utils';

export interface RHFInputProps extends InputProps {
  name: string;
  label?: string;
  labelPlacement?: 'top' | 'left';
}

const RHFInput = ({
  name,
  label,
  labelPlacement = 'top',
  type = 'text',
  size = 'md',
  ...props
}: RHFInputProps) => {
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
                <label
                  htmlFor={name}
                  className={cn(
                    size === 'sm' && 'text-sm font-medium',
                    size === 'md' && 'text-base font-bold',
                    size === 'lg' && 'text-lg font-bold'
                  )}
                >
                  {label}
                </label>
              )}
              <div className={cn(labelPlacement === 'top' && 'mt-2.5')}>
                {type === 'password' ? (
                  <PasswordInput
                    id={name}
                    error={!!fieldState.error}
                    size={size}
                    {...field}
                    {...props}
                  />
                ) : (
                  <Input
                    id={name}
                    error={!!fieldState.error}
                    type={type}
                    size={size}
                    {...field}
                    {...props}
                  />
                )}
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

export default RHFInput;
