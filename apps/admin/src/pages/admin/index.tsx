import { useAdmins } from '@/shared/api/queries/admin';
import AdminTableHeader from './ui/admin-table-header';
import AdminTableRow from './ui/admin-table-row';
import CreateAdminButton from './ui/create-admin-button';

const AdminPage = () => {
  const { data } = useAdmins();

  return (
    <main className="p-10 container mx-auto flex-1">
      <h1 className="text-2xl font-bold">관리자 목록</h1>

      <div className="mt-8">
        <div className="flex justify-end">
          <CreateAdminButton />
        </div>

        <table className="mt-8 w-full">
          <AdminTableHeader />
          <tbody>
            {data?.pages.map((page, i) =>
              page.content.map((admin, j) => (
                <AdminTableRow
                  key={admin.id}
                  admin={admin}
                  order={i * 10 + j + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminPage;
