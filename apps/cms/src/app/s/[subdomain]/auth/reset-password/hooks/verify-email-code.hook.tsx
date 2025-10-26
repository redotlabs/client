import {
  useMemo,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';

interface State {
  // 타이머 종료 시간
  endAt: number | null;
  isVerified: boolean;
}
interface Action {
  setEndAt: (endAt: number | null) => void;
  setIsVerified: (isVerified: boolean) => void;
}

export const VerifyEmailCodeContext = createContext<State & Action>({
  endAt: null,
  isVerified: false,
  setEndAt: () => {},
  setIsVerified: () => {},
});

export const VerifyEmailCodeProvider = ({ children }: PropsWithChildren) => {
  const [endAt, setEndAt] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const values = useMemo(
    () => ({ endAt, isVerified, setEndAt, setIsVerified }),
    [endAt, isVerified]
  );

  return (
    <VerifyEmailCodeContext value={values}>{children}</VerifyEmailCodeContext>
  );
};

export const useVerifyEmailCode = () => {
  const context = useContext(VerifyEmailCodeContext);

  if (!context) {
    throw new Error(
      'useVerifyEmailCode must be used within a VerifyEmailCodeProvider'
    );
  }

  return context;
};
