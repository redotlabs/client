import {
  useMemo,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';

type Step = 'send-code' | 'verify-code' | 'sign-up' | 'success';

export const SignUpStepContext = createContext<{
  step: Step;
  setStep: (step: Step) => void;
}>({
  step: 'send-code',
  setStep: () => {},
});

export const SignUpStepProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<Step>('send-code');

  const values = useMemo(() => ({ step, setStep }), [step]);

  return <SignUpStepContext value={values}>{children}</SignUpStepContext>;
};

export const useSignUpStep = () => {
  const context = useContext(SignUpStepContext);

  if (!context) {
    throw new Error('useSignUpStep must be used within a SignUpStepProvider');
  }

  return context;
};
