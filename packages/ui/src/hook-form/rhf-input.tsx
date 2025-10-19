'use client';

import { Input, type InputProps } from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';
import PasswordInput from '../password-input';

export interface RHFInputProps extends InputProps {
  name: string;
  label?: string;
}

const RHFInput = ({ name, label, type = 'text', ...props }: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <div>
            {label && (
              <label htmlFor={name} className="text-base font-bold">
                {label}
              </label>
            )}
            <div className="mt-2.5">
              {type === 'password' ? (
                <PasswordInput
                  id={name}
                  error={!!fieldState.error}
                  {...field}
                  {...props}
                />
              ) : (
                <Input
                  id={name}
                  error={!!fieldState.error}
                  type={type}
                  {...field}
                  {...props}
                />
              )}
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
