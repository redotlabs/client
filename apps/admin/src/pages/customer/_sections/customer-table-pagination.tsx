import type { GetCustomersParams } from '@/shared/api/services/customer';
import { Pagination } from '@redotlabs/ui';
import type { Dispatch, SetStateAction } from 'react';

interface CustomerTablePaginationProps {
  totalPages: number;
  currentPage?: number;
  setParams: Dispatch<SetStateAction<GetCustomersParams>>;
}

const CustomerTablePagination = ({
  currentPage = 0,
  setParams,
  totalPages,
}: CustomerTablePaginationProps) => {
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

export default CustomerTablePagination;
