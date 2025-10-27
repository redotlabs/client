import {
  useMemo,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';

type Step = 'send-code' | 'verify-code' | 'reset-password' | 'success';

export const ResetPasswordStepContext = createContext<{
  step: Step;
  setStep: (step: Step) => void;
}>({
  step: 'send-code',
  setStep: () => {},
});

export const ResetPasswordStepProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<Step>('send-code');

  const values = useMemo(() => ({ step, setStep }), [step]);

  return (
    <ResetPasswordStepContext value={values}>
      {children}
    </ResetPasswordStepContext>
  );
};

export const useResetPasswordStep = () => {
  const context = useContext(ResetPasswordStepContext);

  if (!context) {
    throw new Error(
      'useResetPasswordStep must be used within a ResetPasswordStepProvider'
    );
  }

  return context;
};
