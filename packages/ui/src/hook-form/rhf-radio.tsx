import { Radio, RadioProps } from '@redotlabs/ui';
import { Controller, useFormContext } from 'react-hook-form';

export interface RHFRadioProps extends RadioProps {
  name: string;
  label?: string;
}

const RHFRadio = ({ name, label, ...props }: RHFRadioProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Radio
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

export default RHFRadio;
