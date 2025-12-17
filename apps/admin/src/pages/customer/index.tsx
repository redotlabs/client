import { Table, TableBody } from '@redotlabs/ui';
import {
  CustomerTableHeader,
  CustomerTableLoading,
  CustomerTableNoContent,
  CustomerTablePagination,
  CustomerTableRow,
  CustomerTableToolbar,
} from './_sections';
import { useCustomerList } from '@/shared/api/queries/customer';
import { useCallback, useState } from 'react';
import type { GetCustomersParams } from '@/shared/api/services/customer';

const CustomerPage = () => {
  const [params, setParams] = useState<GetCustomersParams>({
    page: 0,
    size: 10,
  });
  const { data, isFetching, isFetched } = useCustomerList({ params });

  const getOrder = useCallback(
    (index: number) => {
      return index + (params.page ?? 0) * (params.size ?? 10) + 1;
    },
    [params.page, params.size]
  );

  const total = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const noData = !isFetching && isFetched && data?.content?.length === 0;

  return (
    <main className="p-10 container mx-auto flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">고객 목록</h1>
        </div>
      </div>

      <CustomerTableToolbar setParams={setParams} disabled={isFetching} />

      <p className="text-right text-gray-500">총 {total}명</p>

      <Table className="mt-4 w-full">
        <CustomerTableHeader />
        <TableBody>
          {isFetching && <CustomerTableLoading />}
          {data?.content?.map((customer, index) => (
            <CustomerTableRow
              key={customer.id}
              customer={customer}
              order={getOrder(index)}
            />
          ))}
        </TableBody>
      </Table>

      {noData && <CustomerTableNoContent />}

      <CustomerTablePagination
        currentPage={params.page}
        setParams={setParams}
        totalPages={totalPages}
      />
    </main>
  );
};

export default CustomerPage;
