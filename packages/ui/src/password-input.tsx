import { useState } from 'react';
import { Input, InputProps } from '@redotlabs/ui';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const PasswordInput = (props?: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const onTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      endContent={
        showPassword ? (
          <button onClick={onTogglePassword} type="button">
            <EyeIcon />
          </button>
        ) : (
          <button onClick={onTogglePassword} type="button">
            <EyeOffIcon />
          </button>
        )
      }
      {...props}
    />
  );
};

export default PasswordInput;
