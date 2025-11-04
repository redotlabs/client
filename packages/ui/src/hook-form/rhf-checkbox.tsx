import { Checkbox, CheckboxProps } from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';

export interface RHFCheckboxProps extends CheckboxProps {
  name: string;
  label?: string;
}

const RHFCheckbox = ({ name, label, ...props }: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          id={name}
          checked={field.value}
          label={label}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default RHFCheckbox;
