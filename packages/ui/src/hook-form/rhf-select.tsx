import {
  Select,
  SelectContent,
  SelectItem,
  SelectProps,
  SelectTrigger,
  SelectValue,
} from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@redotlabs/utils';

export interface RHFSelectProps extends Omit<SelectProps, 'children'> {
  name: string;
  label?: string;
  labelPlacement?: 'top' | 'left';
  options: { label: string; value: string }[];
  placeholder?: string;
}

const RHFSelect = ({
  name,
  label,
  labelPlacement = 'top',
  placeholder = 'Select an option',
  options,
  size = 'md',
  ...props
}: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
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
              <Select
                {...props}
                size={size}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {fieldState.error && (
            <p className="mt-1 text-sm font-semibold text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelect;
