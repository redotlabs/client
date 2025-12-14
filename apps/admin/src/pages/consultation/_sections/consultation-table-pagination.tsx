import type { GetConsultationsParams } from '@/shared/api/services/consultation';
import { Pagination } from '@redotlabs/ui';
import type { Dispatch, SetStateAction } from 'react';

interface ConsultationTablePaginationProps {
  totalPages: number;
  currentPage?: number;
  setParams: Dispatch<SetStateAction<GetConsultationsParams>>;
}

const ConsultationTablePagination = ({
  currentPage = 0,
  setParams,
  totalPages,
}: ConsultationTablePaginationProps) => {
  const onPageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const onNext = () => {
    setParams((prev) => ({ ...prev, page: currentPage + 1 }));
  };

  const onPrevious = () => {
    setParams((prev) => ({ ...prev, page: currentPage - 1 }));
  };

  return (
    <Pagination
      className="mt-4"
      totalPages={totalPages}
      currentPage={currentPage + 1}
      onPageChange={(page) => onPageChange(page - 1)}
      hasPrevious={currentPage > 0}
      hasNext={currentPage < totalPages - 1}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default ConsultationTablePagination;
