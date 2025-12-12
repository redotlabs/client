import type { Admin } from '@/shared/types';
import { Button } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import { AdminSheetButton } from '../_ui';

interface AdminTableRowProps {
  admin: Admin;
  order: number;
}

const AdminTableRow = ({ admin, order }: AdminTableRowProps) => {
  return (
    <tr
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <td className="text-center">{order}</td>
      <td className="text-center">
        <AdminSheetButton admin={admin}>
          <Button variant="text" size="sm" className="p-0 underline">
            {admin.id}
          </Button>
        </AdminSheetButton>
      </td>
      <td className="text-center">{admin.name}</td>
      <td className="text-center">{admin.email}</td>
      <td className="text-center">
        {format(admin.createdAt, 'yyyy-MM-dd HH:mm')}
      </td>
    </tr>
  );
};

export default AdminTableRow;
