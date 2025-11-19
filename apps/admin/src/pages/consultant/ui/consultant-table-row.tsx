import type { Consultant } from '@/shared/types';
import { Badge, Button, TableCell, TableRow } from '@redotlabs/ui';
import { cn } from '@redotlabs/utils';
import { format } from 'date-fns';
import ConsultantSheetButton from './consultant-sheet-button';

interface ConsultantTableRowProps {
  consultant: Consultant;
  order: number;
}

const STATUS_CONFIG = {
  UNPROCESSED: { label: '미처리', color: 'default' as const },
  PROGRESS: { label: '진행중', color: 'info' as const },
  COMPLETED: { label: '완료', color: 'success' as const },
  CANCELLED: { label: '취소', color: 'danger' as const },
};

const ConsultantTableRow = ({ consultant, order }: ConsultantTableRowProps) => {
  const statusConfig = STATUS_CONFIG[consultant.status];

  return (
    <TableRow
      className={cn(
        'border-b-2 border-gray-100 text-sm font-medium text-gray-800',
        '[&>td]:p-3'
      )}
    >
      <TableCell align="center">{order}</TableCell>
      <TableCell align="center">
        <ConsultantSheetButton consultant={consultant}>
          <Button variant="text" size="sm" className="p-0 underline">
            {consultant.id}
          </Button>
        </ConsultantSheetButton>
      </TableCell>
      <TableCell align="center">{consultant.name}</TableCell>
      <TableCell align="center">{consultant.phone}</TableCell>
      <TableCell align="center">
        <Badge
          size="sm"
          color={consultant.isRenewal ? 'warning' : 'info'}
          className="w-fit"
        >
          {consultant.isRenewal ? '리뉴얼' : '신규'}
        </Badge>
      </TableCell>
      <TableCell align="center">
        <p className="line-clamp-2 text-left">{consultant.consultContent}</p>
      </TableCell>
      <TableCell align="center">
        <Badge size="sm" color={statusConfig.color} className="w-fit">
          {statusConfig.label}
        </Badge>
      </TableCell>
      <TableCell align="center">
        {format(new Date(consultant.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
    </TableRow>
  );
};

export default ConsultantTableRow;

