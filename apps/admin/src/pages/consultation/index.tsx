import { Table, TableBody } from '@redotlabs/ui';
import {
  ConsultationTableRow,
  ConsultationTableHeader,
  ConsultationTableLoading,
  ConsultationTableToolbar,
  ConsultationTableNoContent,
  ConsultationTablePagination,
} from './_sections';
import { useConsultationList } from '@/shared/api/queries/consultation';
import type { GetConsultationsParams } from '@/shared/api/services/consultation';
import { useCallback, useState } from 'react';

const ConsultationPage = () => {
  // query key로 전달할 파라미터
  const [params, setParams] = useState<GetConsultationsParams>({
    page: 0,
    size: 10,
  });
  const { data, isFetching, isFetched } = useConsultationList({ params });

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
    <main className="p-10 min-h-0 flex flex-col overflow-y-auto">
      <div className="container mx-auto flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">상담 요청 목록</h1>
          </div>
        </div>

        <ConsultationTableToolbar setParams={setParams} disabled={isFetching} />

        <p className="text-right text-gray-500">총 {total}건</p>

        <Table className="mt-4 w-full">
          <ConsultationTableHeader />
          <TableBody>
            {isFetching && <ConsultationTableLoading />}
            {data?.content.map((consultation, index) => (
              <ConsultationTableRow
                key={consultation.id}
                order={getOrder(index)}
                consultation={consultation}
              />
            ))}
          </TableBody>
        </Table>

        {noData && <ConsultationTableNoContent />}

        <ConsultationTablePagination
          currentPage={params.page}
          setParams={setParams}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};

export default ConsultationPage;
