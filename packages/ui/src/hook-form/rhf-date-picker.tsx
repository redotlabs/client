import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';

export interface RHFDatePickerProps extends DatePickerProps {
  name: string;
  label?: string;
  labelPlacement?: 'top' | 'left';
}
const RHFDatePicker = ({
  name,
  label,
  labelPlacement = 'top',
  ...props
}: RHFDatePickerProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, ...rest } = field;
        return (
          <div>
            <div
              className={cn(
                labelPlacement === 'left' && 'flex items-center gap-4'
              )}
            >
              {label && (
                <label htmlFor={name} className="text-sm font-medium">
                  {label}
                </label>
              )}
              <div className={cn(labelPlacement === 'top' && 'mt-2.5')}>
                <DatePicker
                  id={name}
                  error={!!fieldState.error}
                  setValue={onChange}
                  defaultValue={value}
                  {...rest}
                  {...props}
                />
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

export default RHFDatePicker;
