import { cn } from '@redotlabs/utils';

const AdminTableHeader = () => {
  return (
    <thead className="h-11">
      <tr
        className={cn(
          'text-sm font-semibold text-gray-800',
          '[&>th]:p-3 [&>th]:bg-gray-100',
          '[&>th:first-child]:rounded-l-md [&>th:last-child]:rounded-r-md'
        )}
      >
        <th className="text-center">순번</th>
        <th className="text-center">ID</th>
        <th className="text-center">이름</th>
        <th className="text-center">이메일</th>
        <th className="text-center">생성일</th>
      </tr>
    </thead>
  );
};

export default AdminTableHeader;
