import { useMutation } from '@tanstack/react-query';
import { createConsultation } from '@/shared/api/services/consultation';

export const useCreateConsultation = () => {
  return useMutation({
    mutationFn: createConsultation,
  });
};
