import SuccessStep from './success-step';
import SendCodeStep from './send-code-step';
import VerifyCodeStep from './verify-code-step';
import ResetPasswordStep from './reset-password-step';
import { useResetPasswordStep } from '../hooks/reset-password-step.hook';

const StepRenderer = () => {
  const { step } = useResetPasswordStep();

  return (
    <>
      {step === 'send-code' && <SendCodeStep />}
      {step === 'verify-code' && <VerifyCodeStep />}
      {step === 'reset-password' && <ResetPasswordStep />}
      {step === 'success' && <SuccessStep />}
    </>
  );
};

export default StepRenderer;
