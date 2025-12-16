import { Button, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/shared/routes/routes';
import type { CustomerDto } from '@/shared/api/services/customer';
import {
  CustomerBanButton,
  CustomerDeleteButton,
  CustomerStatusBadge,
} from '../_ui';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/shared/api/query-key-factory';

interface CustomerTableRowProps {
  customer: CustomerDto;
  order: number;
}

const CustomerTableRow = ({ customer, order }: CustomerTableRowProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onNavigateToDetail = () => {
    queryClient.setQueryData(
      queryKeyFactory.customer.detail(customer.id),
      customer
    );
    navigate(PATH.customer.detail(customer.id));
  };

  const onNavigateToApp = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('customerId', customer.id.toString());
    navigate({
      pathname: PATH.customer.app,
      search: searchParams.toString(),
    });
  };

  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">
        {/* <CustomerSheetButton customer={customer} /> */}
        <Button
          size="sm"
          variant="text"
          className="p-0 underline"
          onClick={onNavigateToDetail}
        >
          {customer.id}
        </Button>
      </TableCell>
      <TableCell align="center">{customer.name}</TableCell>
      <TableCell align="center">{customer.email}</TableCell>
      <TableCell align="center">
        <Button
          size="sm"
          variant="text"
          className="p-0 underline"
          onClick={onNavigateToApp}
        >
          {customer.appCount}
        </Button>
      </TableCell>
      <TableCell align="center">{customer.socialProvider || '-'}</TableCell>
      <TableCell align="center">
        <CustomerStatusBadge status={customer.status} />
      </TableCell>
      <TableCell align="center">
        {format(new Date(customer.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell align="center" className="w-fit">
        <div className="w-fit flex items-center justify-center gap-2">
          <CustomerBanButton customer={customer} />
          <CustomerDeleteButton customer={customer} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CustomerTableRow;
