import { useAdminList } from '@/shared/api/queries/admin';
import {
  AdminTableRow,
  AdminTableHeader,
  AdminTableLoading,
  AdminTableNoContent,
  AdminTablePagination,
} from './_sections';
import CreateAdminButton from './_ui/create-admin-button';
import { useState } from 'react';
import type { PageParams } from '@repo/types';
import { Table, TableBody } from '@redotlabs/ui';

const AdminPage = () => {
  // query key로 전달할 파라미터
  const [params, setParams] = useState<PageParams>({
    page: 0,
    size: 10,
  });

  const { data, isFetching, isFetched } = useAdminList({ params });

  const total = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const noData = !isFetching && isFetched && data?.content?.length === 0;

  return (
    <main className="p-10 container mx-auto flex-1">
      <h1 className="text-2xl font-bold">관리자 목록</h1>

      <div className="mt-8">
        <div className="flex justify-end">
          <CreateAdminButton />
        </div>

        <p className="mt-4 text-right text-gray-500">총 {total}명</p>

        <Table className="mt-4 w-full">
          <AdminTableHeader />
          <TableBody>
            {isFetching && <AdminTableLoading />}
            {data?.content.map((admin, i) => (
              <AdminTableRow key={admin.id} admin={admin} order={i + 1} />
            ))}
          </TableBody>
        </Table>

        {noData && <AdminTableNoContent />}

        <AdminTablePagination
          currentPage={params.page}
          setParams={setParams}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};

export default AdminPage;
