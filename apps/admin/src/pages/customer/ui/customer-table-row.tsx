import type { Customer } from '@/shared/types';
import { Badge, Button, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/routes/routes';

interface CustomerTableRowProps {
  customer: Customer;
  order: number;
}

const CustomerTableRow = ({ customer, order }: CustomerTableRowProps) => {
  const navigate = useNavigate();

  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">
        <Button
          variant="text"
          size="sm"
          className="p-0 underline text-primary-600 font-semibold"
          onClick={() => navigate(PATH.customer.detail(customer.id))}
        >
          {customer.id}
        </Button>
      </TableCell>
      <TableCell align="center">{customer.name}</TableCell>
      <TableCell align="center">{customer.email}</TableCell>
      <TableCell align="center">{customer.phone}</TableCell>
      <TableCell align="center">{customer.company || '-'}</TableCell>
      <TableCell align="center">
        <span className="font-semibold text-primary-600">
          {customer.appCount}
        </span>
      </TableCell>
      <TableCell align="center">
        <Badge
          size="sm"
          color={customer.status === 'active' ? 'success' : 'default'}
          className="w-fit"
        >
          {customer.status === 'active' ? '활성' : '비활성'}
        </Badge>
      </TableCell>
      <TableCell align="center">
        {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
    </TableRow>
  );
};

export default CustomerTableRow;
