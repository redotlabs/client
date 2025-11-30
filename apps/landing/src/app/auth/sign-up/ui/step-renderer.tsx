import SuccessStep from './success-step';
import SendCodeStep from './send-code-step';
import VerifyCodeStep from './verify-code-step';
import SignUpStep from './sign-up-step';
import { useSignUpStep } from '../hooks/sign-up-step.hook';

const StepRenderer = () => {
  const { step } = useSignUpStep();

  return (
    <>
      {step === 'send-code' && <SendCodeStep />}
      {step === 'verify-code' && <VerifyCodeStep />}
      {step === 'sign-up' && <SignUpStep />}
      {step === 'success' && <SuccessStep />}
    </>
  );
};

export default StepRenderer;
